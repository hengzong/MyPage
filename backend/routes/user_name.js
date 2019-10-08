var mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(''),
    User = require('../models/user');

router.post('/', function(req, res) {
  var name = req.body.user_name;
  User.find({user_name: name}, function(err, docs) {
    if(err) {
      res.status(500);
      res.json({
        message: err.errmsg || err,
        data: {}
      });
    }

    if (docs.length !== 0) {
      res.status(200);
      res.json({
        message: "duplicated",
        data: {}
      });
    } else {
      res.status(200);
      res.json({
        message: "ok",
        data: {}
      });
    }
  });
});

module.exports = router;
