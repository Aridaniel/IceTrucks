// Takes care of decrypting and make sure user is allowed in the app
import admin from 'firebase-admin';
const serviceAccount = require('./secrets.json');

export const verifyIdToken = (token) => {
  if(!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://ice-truck-2d148-default-rtdb.firebaseio.com/"
    });
  }

  return admin.auth().verifyIdToken(token).catch((error) => {
    throw error;
  });
}