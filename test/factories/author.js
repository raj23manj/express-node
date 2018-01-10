var Factory = require('rosie').Factory;
 
module.exports = new Factory()
  .sequence('id')
  .sequence('name', function(i) { return 'author' + i; })
  .attrs({
    createdAt: () => new Date(),
    updatedAt: () => new Date()
  })