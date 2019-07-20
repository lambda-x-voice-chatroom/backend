// require('dotenv').config();

// let admin = require('firebase-admin');

// let serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//     // databaseURL: 'https://voicechatroom-1874e.firebaseio.com'
// });

// const auth = (req, res, next) => {
//     // var idToken = req.get('Authorization');
//     var idToken = req.body;

//     // idToken comes from the client app
//     admin
//         .auth()
//         .verifyIdToken(idToken)
//         .then(function(decodedToken) {
//             let uid = decodedToken.uid;
//             res.locals.uid = uid;
//             next();
//         })
//         .catch(function(error) {
//             res.send(500).json({ message: 'Invalid token' });
//         });
// };
// module.exports = auth;
