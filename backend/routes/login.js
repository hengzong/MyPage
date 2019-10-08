mongoose = require('mongoose');
var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// function encryptPassword(plain_pw){
//   bcrypt.hash(plain_pw, saltRounds, function(err, hash) {
//     if(err) {
//       console.log(err)
//     }
//     console.log(hash);
//     return hash;
//   })
// }

router.post('/', async function(req, res) {
    var key = req.body.key;
    var pw = req.body.password;

    if (key === '' || pw === '') {
      res.status(400);
      return res.json({
        message: 'Missing Key Or Password',
        data: {}
      });
    }

    var name = {"user_name": key}
    var email = {"email": key}

    //search name_pair or email_pair
    User.findOne({$or:[name, email]}, function(err, doc) {
      if(err) {
        res.status(500);
        var message = err.errmsg || err;
        return res.json({
            message: message,
            data: {}
        });
      }

      res.status(404);
      var message = 'Not Found';
      var data = doc
      if(doc !== null) {
        if(pw === doc.password) {
          res.status(200);
          message = 'ok';
          req.session.user = doc;
        } else {
          data = ""
        }
        return res.json({
            message: message,
            data: data
        });
      } else {
        return res.json({
            message: message,
            data: data
        });
      }

    })
});

module.exports = router;
