const admin = require('firebase-admin');
const { getUserById, addUser } = require('../users/usersModel');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const id = await admin
                .auth()
                .verifyIdToken(req.headers.application)
                .then(function(decodedToken) {
                    req.id = decodedToken.uid;

                    return next();
                })
                .catch(function(error) {
                    res.status(403).json({ message: 'Invalid token' });
                });
        } else {
            res.status(403).json({ message: 'No authentication token' });
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports = auth;
