/**
 * Simple HTTP server module
 */
const log = require('winston');
const express = require('express');
const bodyParser = require('body-parser');

const ENV = process.env.NODE_ENV || 'development';

const config = ENV !== 'test' ? require('./config') : require('./config.sample');
const routes = require('./routes');

/**
* Bootstrap
*
* @return {Object} app express instance
*/
function bootstrap() {
  // Initialize app
  const app = new express();

  // ensure data is properly appended to the request body
  app.use(bodyParser.json());

  // log all requests
  app.use((req, res, next) => {
    // make sure all responses default to json
    res.setHeader('Content-Type', 'application/json');

    const remoteAddress =
      (req.socket && (req.socket.remoteAddress
                      || (req.socket.socket &&
                            req.socket.socket.remoteAddress)));

    const message = `${remoteAddress}
                   - - [ ${(new Date()).toUTCString()} ]
                   ${req.method} ${req.url}
                   HTTP/ ${req.httpVersionMajor} ${req.httpVersionMinor}
                   ${(req.headers['user-agent'] || '')}`;

    if (ENV !== 'test') {
      log.info(message);
    }

    next();
  });

  // redirect the index route
  app.get('/', (req, res) => {
    res.status(301).setHeader(`Location, //${req.headers.host}/api/v1/`);
    res.send();
  });

  // mount endpoints on a /api/v(\d) prefix
  app.use('/api/v1', routes());

  // start the app but only log info when ENV is not TEST
  app.listen(config.web_port, () => {
    log.info(`FPaaS now listening on port ${config.web_port}`);
  });

  return app;
}

exports.bootstrap = bootstrap;
