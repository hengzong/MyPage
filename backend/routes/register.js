mongoose = require('mongoose');
var express = require('express'),
    router = express.Router(''),
    User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

function encryptPassword(plain_pw){
  return new Promise(function(resolve, reject) {
    bcrypt.hash(plain_pw, saltRounds, function(err, hash) {
      if(err) {
        console.log(err);
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

router.post('/', async function(req, res) {
  var name = req.body.user_name;
  var email = req.body.email;
  var pw = req.body.password;

  // var encrpty_pw = await encryptPassword(pw);
  var newUser = new User({user_name: name, email: email, password: pw});
  // newUser.save(function (err, doc) {
  //   if (err) {
  //     res.status(400);
  //     return res.json({
  //       message: err,
  //       data: {}
  //     });
  //   }
  //   res.status(201);
  //   req.session.user = doc
  //   console.log(req.session.user)
  //   return res.json({
  //     message: "Created",
  //     data: doc
  //   });
  // });
  newUser.save(function(err, doc) {
    if(err) {
        res.status(500);
        var message = err.errmsg || err;
        return res.json({
            message: message,
            data: {}
        });
    } else {
        res.status(201);
        var user_name = doc.user_name;
        var newComponent = new Component({user_name: user_name, title: "About me", content: "tell your story"});
        newComponent.save(function(err, doc) {
            if (err) {
                res.status(500);
                return res.json({
                    message: err.errmsg || "",
                    data: {}
                });
            }
            var componentId = doc._id;
            console.log("register: component_id: "+componentId);
            User.findOneAndUpdate({user_name: user_name}, {componentList: [componentId]}, {new: true}, function(err, doc) {
                return res.json({
                    message: "created",
                    data: doc
                });
            });
        });
    }
});
});

module.exports = router
