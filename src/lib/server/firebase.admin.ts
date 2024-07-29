import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import {
	FIREBASE_PROJECT_ID,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_CLIENT_EMAIL
} from '$env/static/private';
import pkg from 'firebase-admin';

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: FIREBASE_PROJECT_ID,
            privateKey: FIREBASE_PRIVATE_KEY,
            clientEmail: FIREBASE_CLIENT_EMAIL
        })
    });
} catch (error: any) {
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

const adminAuth = getAuth();
const adminDb = getFirestore();

export { adminAuth, adminDb };

export default pkg;

