import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAGnWAYBQjnjuEbemUMAtI-HPNbqpjJVQ0',
  authDomain: 'remisystem-75ab6.firebaseapp.com',
  databaseURL: 'https://remisystem-75ab6.firebaseio.com',
  projectId: 'remisystem-75ab6',
  storageBucket: 'remisystem-75ab6.appspot.com',
  messagingSenderId: '506713044142',
  appId: '1:506713044142:web:28aabdc3c648653976293f',
  measurementId: 'G-P7P7DK6T86',
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
