'use strict';

const Boom = require('boom');  
const uuid = require('node-uuid');  
const Joi = require('joi');

exports.register = function(server, options, next) {

  const db = server.app.db;

server.route({  
    method: ['PUT','PATCH'],
    path: '/books/{id}',
    handler: function (request, reply) {

        db.books.update({
            _id: request.params.id
        }, {
            $set: request.payload
        }, function (err, result) {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (result.n === 0) {
                return reply(Boom.notFound());
            }
            reply("Book Updated Successfully");
            //reply().code(204);
        });
    },
    config: {
        validate: {
            payload: Joi.object({
                title: Joi.string().min(3).max(50).optional(),
                author: Joi.string().min(3).max(50).optional(),
                isbn: Joi.number().optional(),
                genre: Joi.string().min(3).max(50).optional(),
                publicationinfo: {
                        datepublished: Joi.string().min(3).max(50).optional(),
                        publisher : Joi.string().min(3).max(50).optional()
                },
                copies: {
                    edition : Joi.string().min(3).max(50).optional(),
                    numberofcopies : Joi.number().optional(),
                    available : Joi.number().optional()
                }
            }).required().min(1)
        }
    }
});



  return next();
};

exports.register.attributes = {  
  name: 'routes-update-books'
};

