"use client";

import { useEffect, useState } from 'react';
import {
  getFirestore,
  onSnapshot,
  collection,
  Query,
  DocumentData,
} from 'firebase/firestore';
import { useFirebase } from '..';

export function useCollection<T = DocumentData>(path: string) {
  const { app } = useFirebase();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!app) {
      setLoading(false);
      return;
    }

    const db = getFirestore(app);
    const collectionRef = collection(db, path);

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as unknown as T)
        );
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [app, path]);

  return { data, loading, error };
}
