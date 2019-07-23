require('dotenv').config();
const { getUserById, addUser } = require('../users/usersModel');

// Firebase Auth
let admin = require('firebase-admin');

let parsed = JSON.parse(
    new Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64')
);

// let serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
    credential: admin.credential.cert(parsed)
    // credential: admin.credential.cert({
    //     type: process.env.GF_TYPE,
    //     project_id: process.env.GF_PROJECT_ID,
    //     private_key_id: process.env.GF_PRIVATE_KEY_ID,
    //     private_key:NULL,
    //     client_email: process.env.GF_CLIENT_EMAIL,
    //     client_id: process.env.GF_CLIENT_ID,
    //     auth_uri: process.env.GF_AUTH_URI,
    //     token_uri: process.env.GF_TOKEN_URI,
    //     auth_provider_x509_cert_url: process.env.GF_AUTH_PROVIDER_X509_CERT_URL,
    //     client_x509_cert_url: process.env.GF_CLIENT_X509_CERT_URL
    // })
});

const auth = async (req, res, next) => {
    try {
        if (req.headers.application) {
            const id = await admin
                .auth()
                .verifyIdToken(req.headers.application)
                .then(function(decodedToken) {
                    let uid = decodedToken.uid;

                    // next();
                    return uid;
                })
                .catch(function(error) {
                    res.status(403).json({ message: 'Invalid token' });
                });
            const user = await admin
                .auth()
                .getUser(id)
                .then(function(userRecord) {
                    let displayName = userRecord.toJSON().providerData[0]
                        .displayName;
                    let email = userRecord.toJSON().providerData[0].email;
                    let photoURL = userRecord.toJSON().providerData[0].photoURL;
                    return {
                        displayName: displayName,
                        email: email,
                        photoURL: photoURL
                    };
                })
                .catch(function(error) {
                    console.log('Error fetching user data:', error);
                });

            res.locals.uid = id;
            res.locals.displayName = user.displayname;
            res.locals.email = user.email;
            res.locals.photoURL = user.photoURL;
            next();
        } else {
            res.status(403).json({ message: 'No authentication token' });
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports = auth;
