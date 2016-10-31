const should = require('should');
const request = require('supertest');

const app = require('../index').app;

describe('[GET] Index Route', () => {
  it('should redirect to /api/v1/ as default', (done) => {
    request(app).get('/')
                .expect(301)
                .expect('Content-Type','application/json')
                .end((err, response) => {
                  if(err) throw err;
                  done();
                });
  });

  it('should show the welcome message', (done) => {
    request(app).get('/api/v1')
                .expect(200)
                .expect('Content-Type',/json/)
                .end((err, response) => {
                  if(err) throw err;

                  response.body.should.have.property('message')
                               .eql('Welcome to the Hazaam API');
                  done();
                });
  });
});
