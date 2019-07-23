const admin = require('firebase-admin');
const util = require('util');
const router = require('express').Router();
const { getUserById, addUser } = require('../users/usersModel');

router.get('/', async (req, res) => {
    const token = req.headers.application;
    try {
        // Get UID from Google
        let decodedToken = await admin.auth().verifyIdToken(token);

        if (decodedToken) {
            let firebaseUser = await admin.auth().getUser(decodedToken.uid);
            let user = await getUserById(Number(firebaseUser.uid));
            console.log(user);
            if (user != -1) {
                console.log('if');
                res.status(200).json({
                    message: 'success',
                    data: { user }
                });
            } else {
                console.log('else');
                const userInfo = addUser({
                    id: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    avatar: user.photoURL
                });
                if (userIfno) {
                    res.status(201).json({
                        message: 'User Created',
                        data: { userInfo }
                    });
                } else {
                    res.status(500).json({ message: 'Unable to add user' });
                }
            }
        } else {
            res.status(403).json({ message: 'Invalid token', data: error });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
