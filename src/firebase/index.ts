import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import firebaseConfig from './config';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

export type FirebaseInstances = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

function initializeFirebase(): FirebaseInstances {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { app, auth, db };
}

export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { FirebaseProvider, useFirebase } from './provider';

export default initializeFirebase;
