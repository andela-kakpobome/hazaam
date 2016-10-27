/**
* Routes Module
*
* Aggregate all route endpoints here, effectively making
* this the entry/bootstrapping point for all routes
*/

const express = require('express');
const router = express.Router();

const fingerprintRoutes = require('./fingerprints');

//create new express instance to mount resource routes
const mount = new express();

module.exports = function () {

  //mount routes for the fingerprint resource
  mount.use('/fingerprints',fingerprintRoutes(router));

  return mount;
*/

//import other modules
const api = require('../controllers/api');
const debug = require('../controllers/debug');

module.exports = function ( router ) {

  /**
  * Query Endpoint
  */
  router.route('/query')
        .get(api.query);

  /**
  * Ingest Endpoint
  */
  router.route('/ingest')
        .post(api.ingest);

  /**
  * Debug Endpoint
  */
  router.route('/debug')
        .get(debug.debugQuery)
        .post(debug.debugQuery);

  return router;
};
