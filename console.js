var repl = require("repl");
var db = require("./server/models/index.js");
var todo = require("./server/models/todo.js");

var replServer = repl.start({});

replServer.context.db = db.sequelize;
replServer.context.Todo = todo;



