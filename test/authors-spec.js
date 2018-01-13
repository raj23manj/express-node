
//const Author = require('../test/factories/author');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const cheerio = require("cheerio");
const winston = require('winston');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const auth = require('../controllers/ensureAuthentication');

const models = require('../server/models/');

describe("/authors", () => {
  
  let authStub,
      loggerStub;
  
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
    let dbStub;
    
    before(function(){
      // dbStub = {
      //   findAll: function() {
      //     return Promise.resolve([
      //       { id: 1,
      //         name: 'Rajesh',
      //         createdAt: '2017-10-09T18:30:00.000Z',
      //         updatedAt: '2017-10-09T18:30:00.000Z'
      //       }
      //     ]);
      //   }
      // };
      
      dbStub = sinon
                  .stub(models.Author, 'findAll')
                  .returns(
                     Promise.resolve([
                         { id: 1,
                           name: 'Rajesh',
                           createdAt: '2017-10-09T18:30:00.000Z',
                           updatedAt: '2017-10-09T18:30:00.000Z'
                         }
                       ])
                  );
      
      app = proxyquire('../app', {
        ensureAuthentication: authStub,
        models: { Author: dbStub}
      });  
      
      // const models = require('../server/models/');
      // const models = require('../server/models/').Author;
      // .stub(models, 'findAll')
      // .stub(models.Author, 'findAll')
      // models:  dbStub
      // models: { Author: dbStub}
    });
    
    after(function() {
      dbStub.restore();
    });
    
    it('should get all authors', (done) => {
      // request(app).get('/authors/').expect(200).end(done);
      
      request(app).get('/authors/').end((err, res) => {
        let $ = cheerio.load(res.text);
        let divs = $("body").find('.form-row').length;
        // console.log(res.text);
        expect(divs).to.equal(1);
        done();
      });
    });
    
  });
  
  context("New User", () => {
    it("render new page", (done) => {
      request(app).get('/authors/new').expect(200).end(done)
    });
  });
  
  context("Create User", () => {
    let dbStub;
        
    before(function(){
      
      // buildStub = sinon
      //             .stub(models.Author, 'build')
      //             .returns({name: 'king'});
      
      // dbStub = sinon
      //             .stub(models.Author, 'save')
      //             .returns(Promise.resolve());
      
      // app = proxyquire('../app', {
      //   ensureAuthentication: authStub//,
      //   models: { Author: dbStub } //{ Author: buildStub, dbStub }
      // });              
    });
        
    // one solution
    after(function(){
      models.Author.destroy({where: {}});
    });
      
    it("build new user and render", (done) => {
      request(app).post('/authors/create')
      .send({name: 'king'})
      .expect(302)
      .expect('Location', '/authors/')
      .end(done)
    });
        
    // it("build new user and render", (done) => {
    //   //https://stackoverflow.com/questions/33270667/mocking-stubbing-mongoose-model-save-method
    //   sinon.mock(models.Author)
    //       .expects('save')
    //       .resolves();
    //   
    //   request(app).post('/authors/create')
    //   .send({name: 'king'})
    //   .expect(302)
    //   .expect('Location', '/authors/')
    //   .end(done)
    // });
  });
    
  context("delete User", () => {
    let dbStub;
        
        before(function(){
          dbStub = sinon
                      .stub(models.Author, 'destroy')
                      .returns(Promise.resolve());
          
          app = proxyquire('../app', {
            ensureAuthentication: authStub,
            models: { Author: dbStub } 
          });              
        });
        
        after(function() {
          dbStub.restore();
        });
      
        it("destroy user", (done) => {
          request(app).get('/authors/23/destroy')
          .expect(302)
          .expect('Location', '/authors')
          .end(done)
        });
  });  
  
  context("Edit Author", () => {
    let dbStub;    
    before(function() {
      dbStub = sinon.stub(models.Author, 'findOne')
                    .returns(Promise.resolve([
                      { id: 1,
                        name: 'Rajesh',
                        createdAt: '2017-10-09T18:30:00.000Z',
                        updatedAt: '2017-10-09T18:30:00.000Z'
                      }
                    ]));
      
     app = proxyquire('../app', {
       ensureAuthentication: authStub,
       models: { Author: dbStub } 
     });                     
                         
    });
    
    after(function() {
      dbStub.restore();
    });
    
    it("should direct to Edit Page", (done) => {
      request(app).get('/authors/1/edit').expect(200).end(done);
    });
  });

  context("Update Author", () => {
    before(function() {
      models.Author.create({name: 'King2'}).then(() => {});
    });
    
    after(function(){
      models.Author.destroy({where: {}});
    });
    
    it("update author", (done) => {
      request(app).post('/authors/1').expect(302).end(done);
    });
    
  });

}); // main describe

// #############################################################################
//spy
//let spy = sinon.spy(models.Author, "findAll");

// it('should get all authors', (done) => {
//   request(app).get('/authors/').expect(200).end(done);
// });

//spy
// it('should get all authors', () => {
//   //request(app).get('/authors/').end(done);
//   models.Author.findAll({})
//   expect(spy).to.have.been.calledOnce
// });

// https://gist.github.com/bulkan/39290b0e4cb9fc76082d
// sinon.stub(models.Author, 'findAll').yields({})
// 
// it('should get all authors', (done) => {
//   request(app).get('/authors/').expect(200).end(done);
// });

// #############################################################################

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

// #############################################################################