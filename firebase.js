// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMcsPBAjZuXXbKn1PgkB1izMSU917JNtY',
  authDomain: 'flowertopia-8d1b8.firebaseapp.com',
  projectId: 'flowertopia-8d1b8',
  storageBucket: 'flowertopia-8d1b8.appspot.com',
  messagingSenderId: '979512979385',
  appId: '1:979512979385:web:57addcfda04b4794215068',
  measurementId: 'G-QFLVKE1S5Z',
};

// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export { firebase };
