const express = require('express');
const router = express.Router();
const models = require('../server/models/');
const ensureAuthentication = require('../controllers/ensureAuthentication');

router.post('/create', ensureAuthentication.authenticateUser(), function(req, res) {
  //var user = req.user.id;
  var feedback = models.BookFeedback.build({rating: 5,
                                            BookId: req.body.book_id,
                                            UserId: 1,
                                            feedback: req.body.feedback,
                                            isActive: true
                                          });

  feedback.validate().then(function(errors){
    if(errors){
      res.send({'test': 'testing'}, 401);
    }else{
      feedback.save().then(function() {
        res.send({'test': 'testing'}, 200);
      });
    }
  });
});

router.get('/:id/edit', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Author.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.render('authors/edit', {object: data});
  });
});

router.post('/:id', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Author.findById(req.params.id).then(function (author) {
    if (author) {
      author.updateAttributes({
        name: req.body.name
      })
    }
  }).then(function (data) {
    res.redirect('/authors');
  });
});

router.get('/:id/destroy', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Author.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/authors');
  });
});

module.exports = router;