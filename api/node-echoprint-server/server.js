/**
 * Simple HTTP server module
 */
const log = require('winston');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');

exports.bootstrap = bootstrap;

/**
* Bootstrap
*/
function bootstrap() {

  'use strict';

  //Initialize app
  let app = new express();

  //ensure data is properly appended to the request body
  app.use(bodyParser.json());

  //log all requests
<<<<<<< HEAD
  app.use(function (req,res,next) {

    const remoteAddress =
      (req.socket && (req.socket.remoteAddress
                      || (req.socket.socket &&
                            req.socket.socket.remoteAddress)));
=======
  app.use(function ( req,res,next ) {

    const remoteAddress =
      (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress)));
>>>>>>> development

    let message = remoteAddress +
                  ' - - [' + (new Date()).toUTCString() + ']' +
                  ' "' + req.method + ' ' + req.url +
<<<<<<< HEAD
                  ' HTTP/' + req.httpVersionMajor + '.' + req.httpVersionMinor
                  + '" ' + (req.headers['user-agent'] || '') + '"';
=======
                  ' HTTP/' + req.httpVersionMajor + '.' + req.httpVersionMinor + '" ' +
                  (req.headers['user-agent'] || '') + '"';
>>>>>>> development

    log.info(message);
    next();
  });

  //mount endpoints on a /api/v(\d) prefix
<<<<<<< HEAD
  app.use('/api/v1',routes());
=======
  app.use('/api/v1',routes(router));
>>>>>>> development

  //start the app
  app.listen(config.web_port,function() {
    log.info('FPaaS now listening on port '+config.web_port);
<<<<<<< HEAD
  });
=======
  })
>>>>>>> development
}
