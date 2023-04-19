import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './firebaseConfig';

/*
const firebaseConfig = {
  apiKey: 'Lorem ipsum dolor sit amet',
  authDomain: 'Lorem ipsum dolor sit amet',
  projectId: 'Lorem ipsum dolor sit amet',
  storageBucket: 'Lorem ipsum dolor sit amet',
  messagingSenderId: 'Lorem ipsum dolor sit amet',
  appId: 'Lorem ipsum dolor sit amet',
};
*/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
