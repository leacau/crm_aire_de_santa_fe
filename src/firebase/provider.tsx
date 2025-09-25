"use client";

import React, { createContext, useContext, useMemo } from 'react';
import initializeFirebase, { FirebaseInstances } from '.';

const FirebaseContext = createContext<FirebaseInstances | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const instances = useMemo(() => initializeFirebase(), []);
  return (
    <FirebaseContext.Provider value={instances}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseInstances => {
  const context = useContext(FirebaseContext);
  if (context === null) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
