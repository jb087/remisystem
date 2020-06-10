import firebase from 'firebase-admin';
import axios from 'axios';
import 'regenerator-runtime';

require('dotenv').config();

let serviceAccount = {
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": ""
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