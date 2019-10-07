import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: 'AIzaSyD0bvnhWBRh-k9c2S4dBw-FKJt9o_RRzn8',
  authDomain: 'chatroom-e9b48.firebaseapp.com',
  databaseURL: 'https://chatroom-e9b48.firebaseio.com',
  projectId: 'chatroom-e9b48',
  storageBucket: '',
  messagingSenderId: '203165867287',
  appId: '1:203165867287:web:2a99e5873e5427545f6b52'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const firestore = firebase.firestore();
export const getTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
