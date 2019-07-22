require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const auth = require('./middleware/auth');

const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');
const groupRouter = require('./groups/groupsRouter');
const voiceRouter = require('./voice/voiceRouter');
const uploadRouter = require('./upload/uploadRouter');
const billingRouter = require('./billing/billingRouter');

const db = require('../data/dbConfig.js');
const server = express();

server.use(morgan('dev'));
server.use(cors());
server.use(auth);
server.use(express.json());

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
