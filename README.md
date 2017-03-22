# express-node

> Server & Setup:

  - To Start In Local 

   - $ DEBUG=myapp:* npm start

  - Using nodemon to start <this command detects changes and restarts automatically>
   - $ npm run start:dev

  - To use Sequilize
    - $ node_modules/.bin/sequelize <cmd>


> Database:

  - To Create db locally
   - createdb library_mngt_dev

> Console: (similar to rails c)
  - $ node console
  - to execute queries
    - models.Todo.findAll().then(function(data){ console.log(data)})