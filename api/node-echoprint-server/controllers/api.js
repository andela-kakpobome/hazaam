const fingerprinter = require('./fingerprinter');
const log = require('winston');
const server = require('../server');
const urlParser = require('url');

const config = require('../config');

/**
 * Querying for the closest matching track.
 */
exports.query = function(req, res) {
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

  fingerprinter.decodeCodeString(code, function(err, fp) {
    if (err) {
      log.error('Failed to decode codes for query: ' + err);
      res.status(500)
         .send({ error: 'Failed to decode codes for query: ' + err });
    }

    fp.codever = codeVer;

    fingerprinter.bestMatchForQuery(fp, config.code_threshold, (err, result) => {
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
          error: 'Version "' + codeVer + '" does not match required version "'
                  + config.codever + '"'
      });
  if (isNaN(parseInt(length, 10)))
    res.status(500).send({ error: 'Missing or invalid "length" field' });
  if (!track)
    res.status(500).send({ error: 'Missing "track" field' });
  if (!artist)
    res.status(500).send({ error: 'Missing "artist" field' });

  fingerprinter.decodeCodeString(code, function(err, fp) {
    if (err || !fp.codes.length) {
      log.error('Failed to decode codes for ingest: ' + err);
      res.status(500).send({
        error: 'Failed to decode codes for ingest: ' + err
      });
    }

    fp.codever = codeVer;
    fp.track = track;
    fp.length = parseInt(length);
    fp.artist = artist;

    fingerprinter.ingest(fp, function(err, result) {
      if (err) {
        log.error('Failed to ingest track: ' + err);
        res.status(500).send({ error: 'Failed to ingest track: ' + err });
      }

      const duration = new Date() - req.start;
      log.debug('Ingested new track in ' + duration + 'ms. track_id=' +
        result.track_id + ', artist_id=' + result.artist_id);

      result.success = true;
      res.status(200).send(result);
    });
  });
};
