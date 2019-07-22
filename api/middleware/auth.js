require('dotenv').config();

let admin = require('firebase-admin');

let serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function auth(req, res, next) {
    if (req.headers.application) {
        admin
            .auth()
            .verifyIdToken(req.headers.application)
            .then(function(decodedToken) {
                let uid = decodedToken.uid;
                res.locals.uid = uid;
                next();
            })
            .catch(function(error) {
                res.status(403).json({ message: 'Invalid token' });
            });
    } else {
        res.status(403).json({ message: 'No authentication token' });
    }
}
module.exports = auth;
