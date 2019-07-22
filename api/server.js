require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const auth = require('./middleware/auth');

const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');
const groupRouter = require('./groups/groupsRouter');
const voiceRouter = require('./voice/voiceRouter');
const uploadRouter = require('./upload/uploadRouter');
const billingRouter = require('./billing/billingRouter');

// Middleware

server.use(morgan('dev'));
server.use(cors());
server.use(auth);
server.use(express.json());

// Routes

server.use('/api/team', teamRouter);
server.use('/api/users', usersRouter);
server.use('/api/groups', groupRouter);
server.use('/api/voice', voiceRouter);
server.use('/api/upload', uploadRouter);
server.use('/api/billing', billingRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = server;
