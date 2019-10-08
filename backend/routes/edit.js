mongoose = require('mongoose');
var express = require('express'),
    router = express.Router(''),
    User = require('../models/user');

//From https://www.tutorialspoint.com/expressjs/expressjs_authentication.htm
router.use('/', function (req, res, next) {
  if(req.session.user){
    next();     //If session exists, proceed to page
  } else {
    res.status(401);
    res.json({
      message: "Unauthorized",
      data: {}
    });
  }
})

router.get('/', function(req, res) {
  // console.log(req.session.user)
  res.json({
    message: "edit page",
    data: "welcome " + req.session.user.user_name
  });
});

module.exports = router;
