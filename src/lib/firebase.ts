import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


// Debug configuration
// console.log('Firebase Config:', {
//     apiKey: firebaseConfig.apiKey ? 'present' : 'missing',
//     authDomain: firebaseConfig.authDomain ? 'present' : 'missing',
//     projectId: firebaseConfig.projectId ? 'present' : 'missing',
//     storageBucket: firebaseConfig.storageBucket ? 'present' : 'missing',
//     messagingSenderId: firebaseConfig.messagingSenderId ? 'present' : 'missing',
//     appId: firebaseConfig.appId ? 'present' : 'missing'
// });

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
console.log(app);
export const auth = getAuth(app);