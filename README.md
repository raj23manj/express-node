# express-node

> Server & Setup:
  - Setup
    - npm install
  - To Start In Local 
    - $ DEBUG=myapp:* npm start

  - Using nodemon to start <this command detects changes and restarts automatically>
    - $ npm run start:dev
    
  - Update any nodel module
  	- npm update 'package_name' --save   

  - To use Sequilize to migrate the DB
    - $ node_modules/.bin/sequelize db:migrate
    
  - To create model with migration
    - node_modules/.bin/sequelize model:create --name MyUser --attributes first_name:string,last_name:string,bio:text  
    
  - To generate new migration File
    - node_modules/.bin/sequelize migration:generate --name yourMigrationName  

> Database:

  - To Create db locally
    - $ createdb library_mngt_dev
  - To run manual migration check the reference
  	-	https://github.com/sequelize/sequelize/issues/313  

> Console: (similar to rails c)
  - $ node console
  - to execute queries
    - models.Todo.findAll().then(function(data){ console.log(data)})
    
> References: (sequelize)
    - https://www.npmjs.com/package/sequelize-cli
     
> Run in the Debug mode:
  - node --inspect ./bin/www 
  - Open chrome and hit the below link
    - chrome://inspect/
    
# Readings

https://github.com/sindresorhus/awesome-nodejs

https://scotch.io/tutorials/use-ejs-to-template-your-node-application




Nock:

  used for mocking external call to server like wiki server to get mock respond

rewire:

  like factory girl to to mock data, and function calls
  inject variables into SUT (system under Test)

Sinon:

https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/

  spies:
    To know know how function is called, with what all params it is called 

cheerio:

  to check server response like dom traversal


example application for reference:

https://github.com/madhums/node-express-mongoose-demo/blob/master/test/test-articles-create.js
https://github.com/sahat/hackathon-starter/blob/master/app.js


ES6: methods and usage

http://es6-features.org/#NumberSignDetermination


Create a Test Env:


  https://stackoverflow.com/questions/24168592/test-environment-in-node-js-express-application

  http://himanshu.gilani.info/blog/2012/09/26/bootstraping-a-node-dot-js-app-for-dev-slash-prod-environment/

  https://medium.com/node-and-beyond/environment-dependent-node-js-configuration-b51149286e7e

https://expressjs.com/en/guide/migrating-4.html



Node:
https://nodeschool.io

  https://ciphertrick.com/category/node-js-2/
https://codeforgeek.com

https://acfo.org/uploads/minutes/73597218ca257c8e5e45ab51a68f2721.pdf
https://github.com/PacktPublishing?utf8=%E2%9C%93&q=node&type=&language=
https://www.quora.com/What-are-the-best-resources-for-learning-Node-js?page_id=1#!n=90

https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6

https://www.udemy.com/webpack-2-the-complete-developers-guide/

Mocha, Chai Authenticated User:
  https://codeburst.io/authenticated-testing-with-mocha-and-chai-7277c47020b7

udemy: 
https://www.udemy.com/es6-bootcamp-next-generation-javascript/
https://www.udemy.com/es6-bootcamp-next-generation-javascript/


https://www.udemy.com/node-postgresql/

https://www.udemy.com/git-a-web-developer-job-mastering-the-modern-workflow/

Testing Lynda:
  https://www.linkedin.com/learning/node-js-testing-and-code-quality/survey-of-node-js-testing-frameworks?u=2108937

promises:

  http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/
  https://scotch.io/@wesleylhandy/writing-your-own-javascript-promises

async:
  http://www.sebastianseilund.com/nodejs-async-in-practice

https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

how to use promises:
https://runnable.com/blog/common-promise-anti-patterns-and-how-to-avoid-them
EventLoop:
https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/

promisfiy:
https://stackoverflow.com/questions/34960886/are-there-still-reasons-to-use-promise-libraries-like-q-or-bluebird-now-that-we
http://panthersoftware.com/2016/05/18/native-vs-third-party-promises/
https://medium.com/@suyashmohan/util-promisify-in-node-js-v8-d07ef4ea8c53

Mongo Sample DB:
  https://stackoverflow.com/questions/5723896/is-there-a-sample-mongodb-database-along-the-lines-of-world-for-mysql
