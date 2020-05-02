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

const getUserSettingsRef = (uid) => {
  if (!uid) {
    throw Error({ message: 'uid is not defined' });
  }

  return firestore.collection('userSettings').doc(uid);
};

export const getOrCreateSettings = async (uid) => {
  const userSettingsRef = getUserSettingsRef(uid);
  const snapshot = await userSettingsRef.get();

  if (!snapshot.exists) {
    setUserSettings(uid, { sendEmailReminders: false });
  }

  return getUserSettings(uid);
};

export const setUserSettings = async (uid, { sendEmailReminders }) => {
  const userSettingsRef = getUserSettingsRef(uid);

  try {
    await userSettingsRef.set({ sendEmailReminders });
  } catch (error) {
    throw Error({ message: 'Error while settin user settings', error });
  }
};

export const getUserSettings = async (uid) => {
  try {
    const userSettingsRef = getUserSettingsRef(uid);
    const userSettingsDocument = await userSettingsRef.get();

    return {
      ...userSettingsDocument.data(),
    };
  } catch (error) {
    throw Error({ message: 'Error while getting user settings', error });
  }
};
