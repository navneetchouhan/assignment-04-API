'use strict';

const Hapi = require('hapi');  
const mongojs = require('mongojs');
const getbooks =  require('./routes/books/getbooks');
const addbooks =  require('./routes/books/addbooks');
const updatebooks =  require('./routes/books/updatebooks');
const deletebooks =  require('./routes/books/deletebooks');

// Create a server with a host and port
const server = new Hapi.Server();  
server.connection({  
  port: 3000
});

//Connect to db
server.app.db = mongojs('hapi-rest-mongo', ['books']);



var people = { 
    1: {
      id: 1,
      name: 'Navneet Kaur Chauhan'
    }
};
  
var validate = function (decoded, request, callback) { 
    if (!people[decoded.id]) {
      return callback(null, false);
    }
    else {
      return callback(null, true);
    }
};





//Load plugins and start server
server.register([  
  require('hapi-auth-jwt2'), getbooks, addbooks, updatebooks, deletebooks
], (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('jwt', 'jwt',
    { key: 'NeverShareYourSecret',     
      validateFunc: validate,         
      verifyOptions: { algorithms: [ 'HS256' ] }
    });
  
  server.auth.default('jwt');


    // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});




