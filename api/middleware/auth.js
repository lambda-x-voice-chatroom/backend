require('dotenv').config();
const { getUserById, addUser } = require('../users/usersModel');

// Firebase Auth
let admin = require('firebase-admin');

// let serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
    credential: admin.credential.applicationDefault()
    // credential: admin.credential.cert(googleServiceAccount)
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
