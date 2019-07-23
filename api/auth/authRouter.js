const Router = require('express').Router;
const { getUserById, addUser } = require('../users/usersModel');
const router = new Router();
let admin = require('firebase-admin');

router.post('/', async (req, res) => {
    try {
        // Get UID from Google
        const id = await admin
            .auth()
            .verifyIdToken(req.headers.application)
            .then(function(decodedToken) {
                let uid = decodedToken.uid;
                return uid;
            })
            .catch(function(error) {
                res.status(403).json({ message: 'Invalid token', data: error });
            });
        // const user = await getUserById(id);
        // if (user) {
        //     res.send(200).json({ message: 'Succcess', data: user });
        // } else {
        console.log(req.body);
        const user = addUser(req.body);
        res.status(201).json({ message: 'User Created', data: user });
        // }
        // validate user is in the system
        // Get initial user data from DB and send back to client
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
