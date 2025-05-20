import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);

// ✅ Use default in-memory auth
const auth = getAuth(app);

// ✅ Force Firestore to use long polling to avoid transport errors
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  // @ts-ignore: allow untyped option for React Native fix
  useFetchStreams: false,
});

export { auth, db };
