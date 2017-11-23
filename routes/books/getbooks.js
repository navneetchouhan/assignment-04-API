'use strict';

const Boom = require('boom');  
const uuid = require('node-uuid');  
const Joi = require('joi');

exports.register = function(server, options, next) {



  const db = server.app.db;

   server.route({  
    method: 'GET',
    path: '/books/{id}',
    handler: function (request, reply) {

       db.books.findOne({
            _id: request.params.id
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });

    }
});





server.route({  
    method: 'GET',
    path: '/books',
    handler: function (request, reply) {

            if(getParameterByName('limit', request.url.path) !='' && getParameterByName('limit', request.url.path) != null){

            db.books.find().limit(parseInt(getParameterByName('limit', request.url.path)), (err, docs) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            reply(docs);
        });  
        }  
        else if(getParameterByName('id', request.url.path) !='' && getParameterByName('id', request.url.path) != null){
            db.books.findOne({
            _id: getParameterByName('id', request.url.path)
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });
        }
        else if(getParameterByName('isbn', request.url.path) !='' && getParameterByName('isbn', request.url.path) != null){
            db.books.findOne({
            isbn: parseInt(getParameterByName('isbn', request.url.path))
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });
        }
        else if(getParameterByName('genre', request.url.path) !='' && getParameterByName('genre', request.url.path) != null){
            db.books.find({
            genre: new RegExp('^' + getParameterByName('genre', request.url.path), 'i') 
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });
        }
        else if(getParameterByName('author', request.url.path) !='' && getParameterByName('author', request.url.path) != null){
            db.books.find({
            author: { '$regex' : getParameterByName('author', request.url.path), '$options' : 'i' }   
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });
        }
         else if(getParameterByName('title', request.url.path) !='' && getParameterByName('title', request.url.path) != null){
            db.books.find({
            title: { '$regex' : getParameterByName('title', request.url.path), '$options' : 'i' }   
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });
        }
        else{
            db.books.find((err, docs) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            reply(docs);
        });
        }


        } 
});










  return next();
};

exports.register.attributes = {  
  name: 'routes-get-books'
};



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}