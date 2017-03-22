var repl = require("repl");
//var db = require("./server/models/index.js");
var models = require('./server/models/index');
var todo = require("./server/models/todo.js");

var replServer = repl.start({});

//replServer.context.db = db.sequelize;
//replServer.context.Todo = todo;
replServer.context.models = models;



