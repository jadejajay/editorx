import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

interface FetchDocumentResult<T> {
  document: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetchDocumentById = <T,>(
  collectionPath: string,
  documentId: string
): FetchDocumentResult<T> => {
  const [document, setDocument] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(collectionPath)
      .doc(documentId)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            setDocument(snapshot.data() as T);
            setLoading(false);
            setError(null);
          } else {
            setLoading(false);
            setError('Document not found');
          }
        },
        (err) => {
          setLoading(false);
          setError(err.message);
        }
      );

    return () => {
      // Unsubscribe from the Firestore listener when the component unmounts
      unsubscribe();
    };
  }, [collectionPath, documentId]);

  return { document, loading, error };
};
