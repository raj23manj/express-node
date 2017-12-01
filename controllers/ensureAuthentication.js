exports.authenticateUser = function(){
  return function (req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/registrations/login');
  }
}
