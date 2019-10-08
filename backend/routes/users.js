mongoose = require('mongoose');
var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    Component = require('../models/components');

// function isEmpty(obj) {
//     return Object.keys(obj).length === 0;
// }

router.get('/', function(req, res) {
    User.find(function(err, docs) {
        if(err) {
            res.status(500);
            var message = err.errmsg || err;
            return res.json({
                message: message,
                data: {}
            });
        } else {
            res.status(200);
            return res.json({
                message: "ok",
                data: docs
            });
        }
    });
});

//create new user
router.post('/', function (req, res) {
    var newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    });

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
            var newComponent = new Component({user_name: user_name, title: "about me", content: "tell your story"});
            newComponent.save(function(err, doc) {
                if (err) {
                    res.status(500);
                    return res.json({
                        message: err.errmsg || "",
                        data: {}
                    });
                }
                var componentId = doc._id;
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

// //delete a user
// router.delete('/', function (req, res) {

// });

module.exports = router;

    // var newUser1 = new User({name: "heng", email: "heng@123.com"});
    // var newUser2 = new User({name: "zong", email: "zong@123.com"});
    // var newUser3 = new User({name: "abab", email: "abab@123.com"});
    // var newUser4 = new User({name: "bcbc", email: "bcbc@123.com"});
    // var newUser5 = new User({name: "cdcd", email: "cdcd@123.com"});
    // var newUser6 = new User({name: "dede", email: "dede@123.com"});
    // var newUser7 = new User({name: "efef", email: "efef@123.com"});

    // newUser1.save();
    // newUser2.save();
    // newUser3.save();
    // newUser4.save();
    // newUser5.save();
    // newUser6.save();
    // newUser7.save();

            // avatar_url: "https://i.pinimg.com/originals/e4/2c/65/e42c65c44a9a3c890bc2288ba3b102a1.jpg",
        // email: "hengzong66@gmail.com",
        // password: "123456",
        // bio: "hello i am a student at U of I",
        // phone_number: "2179798888",
