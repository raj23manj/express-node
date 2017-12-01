var app = require("./app"); // TODO: @saghosh: need to mode this to a seperate module for gobal scope
var repl = require("repl");
var models = require('./server/models/index.js');
var replServer = repl.start({});

//replServer.context.db = db.sequelize;
//replServer.context.Todo = todo;
replServer.context.models = models;



