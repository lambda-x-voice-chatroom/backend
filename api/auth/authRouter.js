const Router = require('express').Router;
const { getUserById, addUser } = require('../users/usersModel');
const router = new Router();
// let admin = require('firebase-admin');
// let parsed = JSON.parse(
//     new Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64')
// );

// admin.initializeApp({
//     credential: admin.credential.cert(parsed)
// });
const firebaseApp = require('../auth/firebase');

router.post('/', async (req, res) => {
    try {
        // Get UID from Google
        let id;
        await firebaseApp
            .auth()
            .verifyIdToken(req.headers.application)
            .then(function(decodedToken) {
                id = decodedToken.uid;
                console.log('id: ', id);
            })
            .catch(function(error) {
                res.status(403).json({ message: 'Invalid token', data: error });
            });
        console.log('firebase admin id return: ', id);
        const user = await getUserById(id);
        if (user) {
            res.send(200).json({ message: 'Succcess', data: user });
        } else {
            const userIfno = addUser({
                id: id,
                displayName: req.body.displayName,
                email: req.body.email,
                avatar: req.body.photoURL
            });
            if (userIfno) {
                res.status(201).json({
                    message: 'User Created',
                    data: userIfno
                });
            } else {
                res.status(500).json({ message: 'Unable to add user' });
            }
        }
        // validate user is in the system
        // Get initial user data from DB and send back to client
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
