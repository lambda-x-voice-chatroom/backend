const admin = require('firebase-admin');
const util = require('util');
const router = require('express').Router();
const { getUserById, addUser } = require('../users/usersModel');

router.get('/', async (req, res) => {
    const token = req.headers.authorization;
    try {
        let decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken) {
            let firebaseUser = await admin.auth().getUser(decodedToken.uid);
            let user = await getUserById(firebaseUser.uid);
            if (user != -1) {
                res.status(200).json({
                    message: 'success',
                    data: user
                });
            } else {
                const user = await addUser({
                    id: firebaseUser.uid,
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email,
                    avatar: firebaseUser.photoURL
                });
                if (user != -1) {
                    res.status(201).json({
                        message: 'User Created',
                        data: user
                    });
                } else {
                    res.status(500).json({ message: 'Unable to add user' });
                }
            }
        } else {
            res.status(403).json({ message: 'Invalid token', data: error });
        }
    } catch (error) {
        console.log('GET /Users : ', error);
        res.status(500).json({ message: 'Server error', data: error });
    }
});

module.exports = router;
