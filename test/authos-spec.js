const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const cheerio = require("cheerio");

const userCredentials = {
  email: 'rmanjunath@teamdrg.com', 
  password: '1234'
}

var authenticatedUser = request.agent(app);
//https://codeburst.io/authenticated-testing-with-mocha-and-chai-7277c47020b7

before(function(done){
  authenticatedUser
    .post('/registrations/login_post')
    .send(userCredentials)
    .end(function(err, res){
      expect(res.statusCode).to.equal(302);
      expect(res.header['location']).to.equal('/books/')
      done();
    });
});


describe("Authors Routes", () => {

  // without authenticated user
  it("should get all authors", (done) => {
    request(app).get('/authors/').expect('Location', '/registrations/login').end(done);
  });

  it("should get all authors", (done) => {
       authenticatedUser.get('/authors/').end((err, res) => {
        // if console logged not getting response text but working keep in mind
          let $ = cheerio.load(res.text);
          let divs = $("body").find('.form-row').length;
          expect(divs).to.equal(1);
          done();
       });
    });

  // for authenticated user

  // it('test', (done) => {
  //    authenticatedUser
  //   .post('/registrations/login_post')
  //   .send(userCredentials)
  //   .end(function(err, res){
  //     //expect(res.statusCode).to.equal(302);
  //     console.log(res.header['location']);
  //     expect(res.header['location']).to.equal('/books/')
  //     //expect(res.header['location'], '/books/aa');
  //     done();
  //   });
  // });

});