// Takes care of decrypting and make sure user is allowed in the app
import admin from 'firebase-admin';
// const serviceAccount = require('./secrets.json');
const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_x509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}

const initApp = () => {
  if(!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://ice-truck-2d148-default-rtdb.firebaseio.com/"
    });
  }
}

export const verifyIdToken = async (token) => {
  initApp();

  return admin.auth().verifyIdToken(token).catch((error) => {
    throw error;
  });
}

// Edit a user's custom claim admin role
export const editUserAsAdmin = async (userId, isAdmin) => {
  initApp();

  return admin
  .auth()
  .setCustomUserClaims(userId, { admin: isAdmin });
}