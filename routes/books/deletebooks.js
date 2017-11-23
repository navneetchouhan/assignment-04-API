'use strict';

const Boom = require('boom');  
const uuid = require('node-uuid');  
const Joi = require('joi');

exports.register = function(server, options, next) {

  const db = server.app.db;

 server.route({  
    method: 'DELETE',
    path: '/books/{id}',
    handler: function (request, reply) {

        db.books.remove({
            _id: request.params.id
        }, function (err, result) {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (result.n === 0) {
                return reply(Boom.notFound());
            }

            reply().code(204);
        });
    }
});





  return next();
};

exports.register.attributes = {  
  name: 'routes-delete-books'
};

