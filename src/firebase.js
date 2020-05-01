import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCtuqQ7Kk-FJ_g43PGzktF4cKV9-qb80N8',
  authDomain: 'remisystem-6a6f2.firebaseapp.com',
  databaseURL: 'https://remisystem-6a6f2.firebaseio.com',
  projectId: 'remisystem-6a6f2',
  storageBucket: 'remisystem-6a6f2.appspot.com',
  messagingSenderId: '246548750377',
  appId: '1:246548750377:web:19adc35a0e896f00453c38',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) {
    return;
  }

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, login=null, sendEmailReminders=null } = user;
    try {
      await userRef.set({
        email,
        login,
        sendEmailReminders,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) {
    return null;
  }

  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
