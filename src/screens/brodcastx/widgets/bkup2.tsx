/* eslint-disable max-lines-per-function */
import { AntDesign } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import type { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import { groupPostsByDay, parseDate } from '@/core';
import { EmptyList, HEIGHT, List, Text, TouchableOpacity, View } from '@/ui';

import { Header, PostCard } from './';

type Props = {};
const mainColor = '#151E27';
export const BroadCastX = ({}: Props) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [lastVisible, setLastVisible] = useState<any>(1696603535636);
  const [firstDocument, setFirstDocument] = useState<any>(null);
  const { colorScheme } = useColorScheme();
  // const flashListRef = React.useRef();
  const flashListRef = useRef<FlashList<any> | null>(null);
  const isDark = colorScheme === 'dark';
  const unViewedPost = 8;
  const collectionPath = 'IBAIS HARDWARE GROUP';
  console.log(data.length, 'data length');
  // const { data, loading, error, loadNextPage, loadPrevPage } =
  //   useInfiniteFirestoreData('IBAIS HARDWARE GROUP');
  // remove until
  const fetchData = () => {
    console.log('fetching data in real-time');
    console.log(lastVisible, 'last visible from fetch data');

    setLoading(true);

    try {
      const unsubscribe = firestore()
        .collection(collectionPath)
        .orderBy('uploadTime')
        .limit(10)
        .onSnapshot((querySnapshot) => {
          const newItems: any = [];

          querySnapshot.forEach((doc) => {
            newItems.push({ id: doc.id, ...doc.data() });
            console.log(
              doc.data().uploadTime,
              'upload time from fetch data in real time'
            );
          });

          if (newItems.length > 0) {
            console.log(newItems, 'fetch data new items');
            console.log('newdata length', newData.length, newData);

            setData((prevData: any) => [...prevData, ...newItems]);
            setLastVisible(newItems[newItems.length - 1].uploadTime);
            setFirstDocument(newItems[0].uploadTime);
          } else {
            console.log(
              "No items returned from server? This shouldn't happen! But handle anyway.."
            );
          }

          setLoading(false);
        });

      return () => {
        // Unsubscribe from the Firestore listener when not needed
        unsubscribe();
      };
    } catch (e) {
      setError(e);
      setLoading(false);
      console.log('Error:', e);
    }
  };

  const loadNextPage = () => {
    console.log('loadNextPage in real-time');

    try {
      const query = firestore()
        .collection(collectionPath)
        .orderBy('uploadTime')
        .startAfter(lastVisible)
        .limit(10);

      const unsubscribe = query.onSnapshot((querySnapshot) => {
        const newItems: any = [];

        querySnapshot.forEach((doc: { id: any; data: () => any }) => {
          newItems.push({ id: doc.id, ...doc.data() });
        });

        if (newItems.length > 0) {
          console.log(
            'newItems',
            newItems,
            'first document',
            firstDocument,
            'last visible',
            lastVisible
          );
          console.log('newdata length', newData.length, newData);

          setData((prevData: any) => [...prevData, ...newItems]);
          setLastVisible(newItems[newItems.length - 1].uploadTime);
        } else {
          console.log(
            "No items returned from server? This shouldn't happen! But handle anyway.."
          );
        }
      });

      return () => {
        // Unsubscribe from the Firestore listener when not needed
        unsubscribe();
      };
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const loadPrevPage = () => {
    console.log('loadPrevPage in real-time');
    console.log('first document in load prev ', firstDocument);

    try {
      const query = firestore()
        .collection(collectionPath)
        .orderBy('uploadTime')
        .endBefore(firstDocument)
        .limitToLast(10);

      const unsubscribe = query?.onSnapshot((querySnapshot) => {
        const newItems: any[] = [];

        querySnapshot.forEach((doc: { id: any; data: () => any }) => {
          newItems.push({ id: doc.id, ...doc.data() });
        });

        if (newItems.length > 0) {
          console.log(
            'newItems',
            newItems,
            'first document',
            firstDocument,
            'last visible',
            lastVisible
          );
          console.log('newdata length', newData.length, newData);
          setData((prevData: any) => [...newItems.reverse(), ...prevData]);
          setFirstDocument(newItems[newItems.length - 1]?.uploadTime);
        } else {
          console.log(
            "No items returned from server? This shouldn't happen! But handle anyway.."
          );
        }
      });

      return () => {
        // Unsubscribe from the Firestore listener when not needed
        unsubscribe();
      };
    } catch (e) {
      console.log('Error:', e);
    }
  };
  useEffect(() => {
    fetchData();
    // changeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const newData = groupPostsByDay(data);
  // console.log(JSON.stringify(newData, null, 2));

  const stickyHeaderIndices = newData
    .map((item: any, index: any) => {
      if (typeof item === 'number') {
        return index;
      } else {
        return null;
      }
    })
    .filter((item: null) => item !== null) as number[];
  const handleScroll = (event: {
    nativeEvent: {
      contentOffset: { y: number };
    };
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Detect when the user has scrolled to the top
    if (offsetY === 0) {
      loadPrevPage();
      // You can perform actions here, such as loading more data.
    }
  };

  const scrollToEnd = () => {
    // Find the index of the item with the given id in the data array
    // const index = newData.findIndex((item: any) => item.id === id);

    flashListRef?.current?.scrollToEnd();
    // if (index !== -1) {
    // Scroll to the item with the specified index
    // flashListRef?.current?.prepareForLayoutAnimationRender();
    // flashListRef?.current?.scrollToIndex({ index, animated: true });
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // }
  };
  // const scrollToId = (id: any) => {
  //   // Find the index of the item with the given id in the data array
  //   const index = newData.findIndex((item2: any) => item2.id === id);
  //   console.log(index);

  //   //5234
  //   if (index !== -1) {
  //     // Scroll to the item with the specified index
  //     // flashListRef?.current?.prepareForLayoutAnimationRender();
  //     flashListRef?.current?.scrollToIndex({ index, animated: true });
  //     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   }
  // };
  // const _scrollToId = (id: any) => {
  //   // Find the index of the item with the given id in the data array
  //   const index = newData.findIndex((item2: any) => item2.id === id);
  //   //5234
  //   if (index !== -1) {
  //     // Scroll to the item with the specified index
  //     // flashListRef?.current?.prepareForLayoutAnimationRender();
  //     flashListRef?.current?.scrollToIndex({
  //       index,
  //       animated: true,
  //     });
  //     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   }
  // };
  const scrollToItem = (item: any) => {
    // Find the index of the item with the given id in the data array
    const index = newData.findIndex((item2: any) => item2 === item);

    if (index !== -1) {
      // Scroll to the item with the specified index
      // flashListRef?.current?.prepareForLayoutAnimationRender();
      flashListRef?.current?.scrollToIndex({ index, animated: true });
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      // flashListRef?.current?.scrollToEnd({ animated: true });
    }
  };
  // 'http://itekindia.com/dashboard/bronco.jpg'
  //  https://images.unsplash.com/photo-1598449356475-b9f71db7d847?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9yaXpvbnRhbHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80
  return (
    <>
      <Header
        src={'http://itekindia.com/dashboard/bronco.jpg'}
        name="IBAIS HARDWARE GROUP"
        subscriber={3556}
      />
      {/* <View className="absolute top-20 z-50 w-full justify-center">
        
      </View> */}
      {unViewedPost !== undefined &&
        unViewedPost !== null &&
        unViewedPost > 0 && (
          <View className="absolute bottom-20 right-5 z-50 items-center justify-center">
            <TouchableOpacity onPress={() => scrollToEnd()}>
              <View
                className="h-12 w-12 items-center justify-center rounded-full"
                style={isDark ? styles.button : styles.button2}
              >
                <AntDesign
                  name="arrowdown"
                  size={24}
                  color={'rgba(100, 116, 139, 1)'}
                />
                <View className="absolute -top-2  rounded-full bg-gray-500 px-3">
                  <Text variant="xs" className="text-center text-white">
                    {unViewedPost}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      <List
        contentContainerStyle={
          isDark ? styles.containerMain : styles.containerMain2
        }
        // scrollEnabled={false}
        ref={flashListRef}
        stickyHeaderIndices={
          stickyHeaderIndices.length > 0 ? stickyHeaderIndices : undefined
        }
        getItemType={(data2: any, _index: number) => {
          if (typeof data2 === 'number') {
            return 'header';
          } else {
            return 'post';
          }
        }}
        data={newData}
        renderItem={({ item, index }) => {
          if (typeof item === 'number' || typeof item === 'string') {
            const date = parseDate(item as number);
            // Rendering header
            return (
              <View
                key={index}
                className="h-10 w-full items-center justify-center"
              >
                <Text
                  className="rounded-full px-4 py-0.5 text-xs font-extrabold"
                  onPress={() => scrollToItem(item)}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    backgroundColor: '#151E2766',
                    color: '#fff',
                  }}
                >
                  {date}
                </Text>
              </View>
            );
          } else {
            // Render item
            return (
              <View key={index}>
                {/* <PostCard data={item} isDark={isDark} /> */}
                {/* <PostCard isDark={isDark} collectionPath={collectionPath} documentId={''} /> */}
              </View>
            );
          }
        }}
        keyExtractor={(_item, index) => {
          return index.toString();
        }}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        ListFooterComponent={
          <View className="h-10 w-full items-center justify-center">
            <Text className="rounded-full px-4 py-0.5 text-xs font-extrabold">
              {parseDate(new Date().getTime())}
            </Text>
          </View>
        }
        estimatedItemSize={HEIGHT * 0.3152}
        // estimatedFirstItemOffset={50}
        // scrollEventThrottle={16}
        onEndReached={loadNextPage}
        onEndReachedThreshold={1}
        onScroll={handleScroll}
        // maintainVisibleContentPosition={{
        //   minIndexForVisible: 0,
        // }}
        // onViewableItemsChanged={
        //   ({ viewableItems }) => {
        //     if (viewableItems.length > 0) {
        //       if (viewableItems[0]?.item?.uploadTime)
        //         setCurrentDate(viewableItems[0].item.uploadTime);
        //     }
        //     // if (viewableItems.length > 0) {
        //     //   console.log('Current Post==>:', viewableItems);
        //     // }
        //   }
        //   // setCurrentState(false);
        // }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
  },
  container2: {
    backgroundColor: '#fff',
  },
  containerMain: {
    backgroundColor: mainColor,
  },
  containerMain2: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#222e3c',
  },
  button2: {
    backgroundColor: '#60aae3',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
// const data: any = [
//   {
//     id: '1234',
//     text: 'IBAIS HARDWARE GROUP1',
//     views: 3463,
//     uploadTime: 1696243535636,
//     image: 'https://pbs.twimg.com/media/EkxqUtrXgAEvdJf.jpg:large',
//     aspectRatio: 1,
//   },
//   {
//     id: '2234',
//     text: 'IBAIS HARDWARE GROUP2',
//     views: 3463,
//     uploadTime: 1696243535636,
//     image: 'https://pbs.twimg.com/media/EkxqUtrXgAEvdJf.jpg:large',
//     aspectRatio: 1,
//   },
//   {
//     id: '3234',
//     text: 'IBAIS HARDWARE GROUP3',
//     views: 3463,
//     uploadTime: 1696243535636,
//     image: 'https://pbs.twimg.com/media/EkxqUtrXgAEvdJf.jpg:large',
//     aspectRatio: 1,
//   },
//   {
//     id: '4234',
//     text: 'IBAIS HARDWARE GROUP4',
//     views: 546,
//     uploadTime: 1696243535636,
//     image: 'https://pbs.twimg.com/media/EkxqUtrXgAEvdJf.jpg:large',
//     aspectRatio: 1,
//   },
//   {
//     id: '5234',
//     text: 'IBAIS HARDWARE GROUP5',
//     views: 3463,
//     uploadTime: 1596243535636,
//     image: 'https://pbs.twimg.com/media/EkxqUtrXgAEvdJf.jpg:large',
//     aspectRatio: 1,
//   },
// ];
