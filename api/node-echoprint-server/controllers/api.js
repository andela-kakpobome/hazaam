const echoprintCodegen = require('echoprint-codegen');
const fs = require('fs');
const glob = require('glob');
const log = require('winston');
const multer = require('multer');
const urlParser = require('url');

const config = require('../config');
const fingerprinter = require('./fingerprinter');
const server = require('../server');

/**
 * Querying for the closest matching track.
 *
 * Queries the fingerprint database for the closest matching track of the code
 * snippet passed in. The audio snippet to be searched for is first
 * fingerprinted and then that code is matched against the database of
 * 'full length' songs that have been ingested into the database.
 *
 * The following are sent as query parameters
 * param {String} code
 * param {String} version
 */
exports.query = (req, res) => {
  const url = urlParser.parse(req.url, true);
  const code = url.query.code;
  if (!code) {
    res.status(400)
       .send({ error: 'Missing code' });
  }

  const codeVer = url.query.version;
  if (codeVer != config.codever) {
    res.status(400)
       .send({ error: 'Missing or invalid version' });
  }

  fingerprinter.decodeCodeString(code, (err, fp) => {
    if (err) {
      log.error('Failed to decode codes for query: ' + err);
      res.status(500)
         .send({ error: 'Failed to decode codes for query: ' + err });
    }

    fp.codever = codeVer;

    fingerprinter.bestMatchForQuery(fp, config.code_threshold,
    (err, result) => {

      if (err) {
        log.warn('Failed to complete query: ' + err);
        res.status(500)
           .send({ error: 'Failed to complete query: ' + err });
      }

      const duration = new Date() - req.start;
      log.debug('Completed lookup in ' + duration + 'ms. success=' +
        !!result.success + ', status=' + result.status);

      res.status(200)
         .send({
              success: !!result.success,
              status: result.status,
              match: result.match || null
         });
    });
  });
};

/**
 * Adding a new track to the database.
 */
exports.ingest = function(req, res) {
  const code = req.body.code;
  const codeVer = req.body.version;
  const length = req.body.length;
  const track = req.body.track;
  const artist = req.body.artist;

  if (!code)
    res.status(500).send({ error: 'Missing "code" field' });
  if (!codeVer)
    res.status(500).send({ error: 'Missing "version" field' });
  if (codeVer != config.codever)
    res.status(500)
       .send({
          error: `Version ${codeVer} does not match required version
                  ${config.codever}`
      });
  if (isNaN(parseInt(length, 10)))
    res.status(500).send({ error: 'Missing or invalid "length" field' });
  if (!track)
    res.status(500).send({ error: 'Missing "track" field' });
  if (!artist)
    res.status(500).send({ error: 'Missing "artist" field' });

  fingerprinter.decodeCodeString(code, function(err, fp) {
    if (err || !fp.codes.length) {
      log.error(`Failed to decode codes for ingest: ${err}`);
      res.status(500).send({
        error: `Failed to decode codes for ingest: ${err}`
      });
    }

    fp.codever = codeVer;
    fp.track = track;
    fp.length = parseInt(length);
    fp.artist = artist;

    fingerprinter.ingest(fp, function(err, result) {
      if (err) {
        log.error('Failed to ingest track: ' + err);
        res.status(500).send({ error: `Failed to ingest track: ${err}` });
      }

      const duration = new Date() - req.start;
      log.debug(`Ingested new track in ${duration} + 'ms. track_id='
        ${result.track_id} artist_id=' ${result.artist_id}`);

      result.success = true;
      res.status(200).send(result);
    });
  });
};

/**
* Validate Upload
*
* @param {Object} file object to validate
*/
function validateUpload(req, file, cb) {

  //cb(new Error('Max file size of 10mb'),false);return;

  if (!/(?:audio\/.+)/.test(file.mimetype)) {
    cb(new Error('Only audio files allowed'),false);return;
  }

  cb(null, true);
}

/**
* Upload
*
* Validates and uploads files
*
* @param {Object} req
* @param {Object} res
*/
function upload(req, res) {

  return new Promise((resolve, reject) => {

    const doUpload = multer({
      dest: './uploads',
      fileFilter: validateUpload,
      limits: {
        fileSize: 10485760
      }
    }).any();

    doUpload(req, res, (err) => {

       if (err) {

         const message = err.message === 'File too large' ?
                         'Max file size of 10mb' : err.message;

         //normalize error object shape
         reject({error: message});
       }

       if (!req.files) reject({error: 'No file uploaded'});

       resolve(req.files[0]);
    });
  });
}

/**
* Wipe Files
*
* Wipes all files in a given directory
*
* @param {String} relative path of files to delete
*/
function wipeFiles(path) {

  glob(path + '/**',(err, files) => {
    files.forEach((file) => {
      if (file !== path) fs.unlink(file);
    });
  });
}

/**
* Create
*
* Receives a full length song/audio file and creates the fingerprint.
* It also appends/ingests the song's details into the database and also
* returns the generated fingerprint.
*
* The following constitute the compulsory fields
* that shape the required payload
* param {Object} audio
*/
exports.create = (req, res) => {

  upload(req,res)
  .then((file) => {

    //generate the Fingerprint
    echoprintCodegen(file.path,(err, data) => {
      if (err) res.status(500).send({error:err});

      //we're done, clear all uploads
      wipeFiles('./uploads');

      res.send(data);
    });
  })
  .catch((err) => {
    res.status(400).send(err);
  });
};
