const request = require('supertest');
const app = require('../../src/app');
// Get the version and author from our package.json
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { version, author } = require('../../package.json');

describe('HTTP unit test for 404 handler', function(){
    describe('when requesting resource /missing', function(){
      it('should respond with 404', function(done){
        request(app)
        .get('/missing')
        .expect('Content-Type', /json/)
        .expect(404, done);
      })
    });
  });