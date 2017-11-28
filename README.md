# express-node

> Server & Setup:
  - Setup
    - npm install
  - To Start In Local 
    - $ DEBUG=myapp:* npm start

  - Using nodemon to start <this command detects changes and restarts automatically>
    - $ npm run start:dev

  - To use Sequilize to migrate the DB
    - $ node_modules/.bin/sequelize db:migrate
    
  - To create model with migration
    - node_modules/.bin/sequelize model:create --name MyUser --attributes first_name:string,last_name:string,bio:text
      
  - To generate new migration File
    - node_modules/.bin/sequelize migration:generate --name yourMigrationName  

> Database:
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