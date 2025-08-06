import admin from 'firebase-admin';
import * as serviceAccount from '../firebase_service/firebase-service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
