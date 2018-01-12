
//const Author = require('../test/factories/author');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const cheerio = require("cheerio");
const winston = require('winston');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const auth = require('../controllers/ensureAuthentication');

describe("/authors", () => {
  
  let authStub;
  
  before(function(){
    authStub = sinon
                .stub(auth, 'authenticateUser')
                .returns(function(req, res, next) {
                  next();
                });
    
    app = proxyquire('../app', {
      ensureAuthentication: authStub
    });              
  });
  
  after(function() {
    authStub.restore();
  });
  
  context("Get Authors", () => {
    it('should get all authors', (done) => {
      request(app).get('/books/').expect(200).end(done);
    });
  });
});


// http://mherman.org/blog/2016/09/25/node-passport-and-postgres/#.WldMdZP1VN0
//const passportStub = require('passport-stub');

//passportStub.install(app);
//req = request.agent(app);

// const userCredentials = {
//   email: 'rmanjunath@teamdrg.com', 
//   password: '1234'
// }

// var authenticatedUser = request.agent(app);
// //https://codeburst.io/authenticated-testing-with-mocha-and-chai-7277c47020b7
// 
// before(function(done){
//   authenticatedUser
//     .post('/registrations/login_post')
//     .send(userCredentials)
//     .end(function(err, res){
//       expect(res.statusCode).to.equal(302);
//       expect(res.header['location']).to.equal('/books/')
//       done();
//     });
// });


// describe("Authors Routes Index No Authentication", () => {

//   // without authenticated user
//   it("should not get all authors", (done) => {
//     request(app).get('/authors/').expect('Location', '/registrations/login').end(done);
//   });

//   // for authenticated user

//   // it('test', (done) => {
//   //    authenticatedUser
//   //   .post('/registrations/login_post')
//   //   .send(userCredentials)
//   //   .end(function(err, res){
//   //     //expect(res.statusCode).to.equal(302);
//   //     console.log(res.header['location']);
//   //     expect(res.header['location']).to.equal('/books/')
//   //     //expect(res.header['location'], '/books/aa');
//   //     done();
//   //   });
//   // });

// });


// describe("Authors with authentication", () => {
//  // example of using rosie objects/factory girl
//   let author = Author.build({});
//   // https://github.com/rosiejs/rosie/issues/23
// 
//   it("should get all authors", (done) => {
//        console.log(author);
//        authenticatedUser.get('/authors/').end((err, res) => {
//         // if console logged not getting response text but working keep in mind
//           let $ = cheerio.load(res.text);
//           let divs = $("body").find('.form-row').length;
//           expect(divs).to.equal(1);
//           done();
//        });
//     });
// });
