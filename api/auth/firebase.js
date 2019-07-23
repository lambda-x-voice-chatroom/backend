const firebaseApp = require('../auth/firebase');
let admin = require('firebase-admin');

let parsed = JSON.parse(
    new Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64')
);
const prodServer = admin.initializeApp(
    {
        credential: admin.credential.cert(parsed)
    },
    'prod'
);

module.exports = {
    firebaseApp: prodServer
};
