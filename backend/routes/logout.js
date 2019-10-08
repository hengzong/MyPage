mongoose = require('mongoose');
var express = require('express'),
    router = express.Router(''),
    User = require('../models/user');


router.get('/', function(req, res){
  req.session.destroy(function(){
    return res.json({
      message: "Logged out",
      data: {}
    });
  });
});

module.exports = router;
