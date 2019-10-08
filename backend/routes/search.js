var mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(''),
    User = require('../models/user');

router.post('/', function(req, res) {
  var key = req.body.key;
  var user_name_search = {"user_name": {"$regex": key, "$options": "i"}};
  var first_name_search = {"first_name": {"$regex": key, "$options": "i"}};
  var last_name_search = {"last_name": {"$regex": key, "$options": "i"}};
  User.find({$or:[user_name_search, first_name_search, last_name_search]}, function(err, docs) {
    if(err) {
      res.status(500);
      res.json({
        message: err.errmsg || err,
        data: {}
      });
    }

    res.status(200);
    res.json({
      message: "ok",
      data: docs
    });
  });
});

module.exports = router;
