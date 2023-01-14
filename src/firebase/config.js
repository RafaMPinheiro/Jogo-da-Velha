import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCtxR45mXmVvqWuGqXnfppwL8YUySzNzAk',
  authDomain: 'jogo-da-velha-cd8e2.firebaseapp.com',
  projectId: 'jogo-da-velha-cd8e2',
  storageBucket: 'jogo-da-velha-cd8e2.appspot.com',
  messagingSenderId: '158425518972',
  appId: '1:158425518972:web:67654ba5b942821e1fcaf9',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
