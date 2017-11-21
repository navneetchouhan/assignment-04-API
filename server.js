'use strict';

const Hapi = require('hapi');  
const mongojs = require('mongojs');
const getbooks =  require('./routes/getbooks');
const addbooks =  require('./routes/addbooks');
const updatebooks =  require('./routes/updatebooks');
const deletebooks =  require('./routes/deletebooks');

// Create a server with a host and port
const server = new Hapi.Server();  
server.connection({  
  port: 3000
});

//Connect to db
server.app.db = mongojs('hapi-rest-mongo', ['books']);

//Load plugins and start server
server.register([  
  getbooks, addbooks, updatebooks, deletebooks
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});