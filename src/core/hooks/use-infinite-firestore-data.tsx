/* eslint-disable max-lines-per-function */
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 10; // Adjust as needed

export function useInfiniteFirestoreData(collectionPath: string) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);

  const fetchData = async (pageDirection: string) => {
    if ((pageDirection === 'prev' && data.length === 0) || loading) {
      console.log(
        'fetching previous data',
        pageDirection,
        data.length,
        loading
      );

      return; // Do nothing if there's no previous data or if already loading
    }
    setLoading(true);
    try {
      let query = firestore().collection(collectionPath).orderBy('desc');
      if (pageDirection === 'next') {
        if (lastVisible) {
          query = query.startAfter(lastVisible);
        } else if (data.length > 0) {
          // If no lastVisible and there's data, it means we're fetching the first page again
          // In this case, just return without fetching more
          setLoading(false);
          return;
        }
        query = query.startAfter(lastVisible);
        console.log('startAfter', lastVisible, query);
      } else if (pageDirection === 'prev' && data.length > 0) {
        query = query.endBefore(data[0].id); // Corrected this line
        console.log('endBefore', data[0].id, query);
      }
      query = query.limit(PAGE_SIZE);

      const querySnapshot = await query.get();
      const newItems: any = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          newItems.push({ id: doc.id, ...doc.data() });
        });

        if (pageDirection === 'next') {
          setData((prevData: any[]) => [...prevData, ...newItems]);
          if (newItems.length > 0) {
            setLastVisible(newItems[newItems.length - 1].id);
          }
        } else {
          setData([...newItems, ...data]);
        }
      } else {
        // Handle the case when no data is available
        // You can set a flag or display a message as needed
      }

      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const loadNextPage = () => {
    console.log('loadNextPage');
    fetchData('next');
  };

  const loadPrevPage = () => {
    console.log('loadPrevPage');
    fetchData('prev');
  };

  useEffect(() => {
    fetchData('next');
    console.log('data fetch first time');
    console.log(data.length, 'data fetch first time');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, loadNextPage, loadPrevPage };
}
