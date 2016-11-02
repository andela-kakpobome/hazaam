const should = require('should');
const glob = require('glob');

const app = require('../index').app;
const request = require('supertest')(app);

describe('Fingerprint Resource', () => {
  describe('Create Endpoint', () => {

    let postRequest;
    beforeEach(() => {
      postRequest = request.post('/api/v1/fingerprints');
    });

    it('should have one file uploaded', (done) => {

      postRequest
        .expect(400)
        .end((err,response) => {
          if (err) throw err;

          response.body.should.have.property('error').eql('No file uploaded');
          done();
       });
    });

    it('should only accept audio files', (done) => {

      postRequest
        .attach('songs','./specs/test-files/random.txt')
        .attach('songs','./specs/test-files/img.jpg')
        .expect(400)
        .end((err,response) => {
          if(err) throw err;

          response.body.should.have.property('error')
                                   .eql('Only audio files allowed');
          done();
       });
    });

    it('should only accept audio files with a max size of 10mb', (done) => {

      postRequest
        .attach('songs','./specs/test-files/audio_gt_10mb.mp3')
        .expect(400)
        .end((err,response) => {
          if(err) throw err;

          response.body.should.have.property('error')
                                   .eql('Max file size of 10mb');
          done();
        });
    });

    it('should return fingerprint object on successful audio ingest',
      (done) => {

      postRequest
        .attach('songs','./specs/test-files/audio_lt_10mb.mp3')
        .expect(200)
        .end((err,response) => {
          if(err) throw err;

            response.body.should.have.property('code').be.a.String();
            done();
       });
    });

    it(`should delete audio file after successful fingerprint generation and
        ingestion`, (done) => {

      setTimeout(() => {
        glob('./uploads/**', (err,files) => {

          //glob adds the folder as one of the elements in the array of it's files
          files.shift();
          files.length.should.eql(0);
          done();
        },1000);
      });
    });
  });
});
