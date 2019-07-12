require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 3300;
server.listen(port, function() {
  console.log(`\n Web API Listening on localhost:${port}\n`);
});
