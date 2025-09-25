"use client";

import { useEffect, useState } from 'react';
import {
  getFirestore,
  onSnapshot,
  doc,
  DocumentData,
} from 'firebase/firestore';
import { useFirebase } from '..';

export function useDoc<T = DocumentData>(path: string) {
  const { app } = useFirebase();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!app) {
      setLoading(false);
      return;
    }
    const db = getFirestore(app);
    const docRef = doc(db, path);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as unknown as T);
        } else {
          setData(null);
        }
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
