require('dotenv').config();
const express = require('express');
const cors = require('cors');
let admin = require('firebase-admin');

let serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    // databaseURL: 'https://voicechatroom-1874e.firebaseio.com'
});
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()

const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');
const groupRouter = require('./groups/groupsRouter');
const voiceRouter = require('./voice/voiceRouter');
const uploadRouter = require('./upload/uploadRouter');
const billingRouter = require('./billing/billingRouter');

const db = require('../data/dbConfig.js');
const server = express();

server.use(cors());
server.use(express.json());
// server.use(auth());
server.use(function(req, res, next) {
    // var idToken = req.get('Authorization');
    let { idToken } = req.body;
    // idToken comes from the client app
    admin
        .auth()
        .verifyIdToken(idToken)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            res.locals.uid = uid;
            next();
        })
        .catch(function(error) {
            res.status(500).json({ message: 'Invalid token' });
        });
});

server.use('/api/team', teamRouter);
server.use('/api/users', usersRouter);
server.use('/api/groups', groupRouter);
server.use('/api/voice', voiceRouter);
server.use('/api/upload', uploadRouter);
server.use('/api/billing', billingRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/test', (req, res) => {
    console.log('req', req.body);
    res.send('Hello World!');
});

module.exports = server;
