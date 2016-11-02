/**
* Fingerprints Resource Routing Module
*
* @param object global router
*/

//import other modules
const api = require('../controllers/api');
const debug = require('../controllers/debug');

module.exports = function (router) {

  /**
  * Query Endpoint
  */
  router.route('/')
        .get(api.query);

  /**
  * Create Endpoint
  */
  router.route('/')
        .post(api.create);

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
