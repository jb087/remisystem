import firebase from 'firebase-admin';
import axios from 'axios';
import 'regenerator-runtime';
import {auth} from "../../src/firebase";

require('dotenv').config();


export const getAccessToken = async () => {
    let credentials = await auth.signInWithEmailAndPassword(process.env.MAIL_LOGIN, process.env.MAIL_PASSWORD)
    
    return credentials.user.xa;
    //return credentials;
};