const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const cheerio = require("cheerio");
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const auth = require('../controllers/ensureAuthentication');

const models = require('../server/models/');


describe("Books Test Cases", () => {
  
  let authStub,
      loggerStub;
  
  before(function(){
    authStub = sinon
                .stub(auth, 'authenticateUser')
                .returns(function(req, res, next) {
                  next();
                });
  });
  
  after(function() {
    authStub.restore();
  });
  
  // All context
  
  context("Books Index", () => {
    let booksStub, categoriesStub;
    before(function(){
      booksStub = sinon
                  .stub(models.Book, 'findAll')
                  .returns(
                     Promise.resolve([
                       { id: 9,
                         name: 'Testasdjhasjdh',
                         AuthorId: 1,
                         uploadBookName: 'c5042ed892dd1ae55e3b632f9d9444d3',
                         CategoryId: 1,
                         image: '47bdadc530bcf812c890eaacb1e54167',
                         description: null,
                         createdAt: '2017-11-21T05:46:16.076Z',
                         updatedAt: '2017-11-21T05:46:16.076Z',
                         Author: [],
                         Category: []
                        }
                       ])
                  );
                  
      categoriesStub = sinon
                  .stub(models.Category, 'findAll')
                  .returns(
                     Promise.resolve([
                         { id: 1,
                           name: 'Demo',
                           createdAt: '2017-10-09T18:30:00.000Z',
                           updatedAt: '2017-10-09T18:30:00.000Z'
                         }
                       ])
                  );
      
      app = proxyquire('../app', {
        ensureAuthentication: authStub,
        models: { Book: booksStub, Category: categoriesStub }
      });  
    });
    
    after(function(){
      booksStub.restore();
      categoriesStub.restore();
    });
    
    it("should render Index", (done) => {
      request(app).get("/books/").expect(200).end(done);      
    });
    
  });
  
});// describe end