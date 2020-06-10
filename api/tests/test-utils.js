import firebase from 'firebase-admin';
import axios from 'axios';
import 'regenerator-runtime';

require('dotenv').config();

let serviceAccount = {
    "type": "0",
    "project_id": "0",
    "private_key_id": "0",
    "private_key": `${process.env.FIREBASE_API_KEY}`,
    "client_email": "0",
    "client_id": "0",
    "auth_uri": "0",
    "token_uri": "0",
    "auth_provider_x509_cert_url": "0",
    "client_x509_cert_url": "0"
}

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    console.log('FIREBASE FROM FILE');
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    });
}


export const getAccessToken = async () => {
    const uri = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`;
    const customToken = await firebase.auth()
        .createCustomToken(process.env.FIREBASE_UID_TEST);
    const result = await axios.post(uri, {
        token: customToken,
        returnSecureToken: true
    }, { validateStatus: false });

    if (!result?.data?.idToken) throw Error('Unable to retrieve access token');
    return result.data.idToken;
};