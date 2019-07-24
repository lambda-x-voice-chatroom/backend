require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const auth = require('./middleware/auth');
// const morgan = require('morgan');

const authRouter = require('./auth/authRouter');
const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');
const groupRouter = require('./groups/groupsRouter');
const voiceRouter = require('./voice/voiceRouter');
const uploadRouter = require('./upload/uploadRouter');
const billingRouter = require('./billing/billingRouter');

require('./auth/firebase');
// Middleware
server.use(helmet());
server.use(
    cors({
        exposedHeaders: ['Content-Length', 'Authorization', 'Accept']
    })
);
// server.use(morgan('dev'));
server.use(express.json());
server.use('/api/auth', authRouter);
// server.use(auth);

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
