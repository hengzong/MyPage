mongoose = require('mongoose');
var express = require('express'),
router = express.Router(),
Component = require('../models/components');
User = require('../models/user');

router.get('/', function(req, res) {
    var user_name = req.query.user_name || "";
    var filter = {};
    if (user_name !== "") {
        filter = {user_name: user_name};
    }
    Component.find(filter, function(err, docs) {
        if(err){
            res.status(500);
            res.json({
                message: err.errmsg || err,
                data: {}
            }); 
        }

        res.status(200);
        return res.json({
            message: "ok",
            data: docs
        });
    })
});

router.post('/', function(req, res) {
    var user_name = req.body.user_name;
    var title = req.body.title || "";
    // var content = req.body.content || "";
    if (user_name === '') {
        res.status(400);
        return res.json({
            message: "Missing user_name",
            data: {}
        });
    }

    User.findOne({user_name: user_name}, function(err, user) {
        if (err) {
            req.status(500);
            return req.json({
                message: err.errmsg || err,
                data: {}
            });
        }

        if (user === null) {
            res.status(400);
            return res.json({
                message: "invalid user_name",
                data: {}
            });
        }

        else {
            var newComponent = new Component({user_name: user_name, title: title});
            newComponent.save(function (err, component) {
                if (err) {
                    res.status(500);
                    return res.json({
                        message: err.errmsg || err,
                        data: {}
                    });
                }
                console.log("user.componentList: ", user.componentList);
                console.log("new id: ", component._id);
                user.componentList.push(component._id);
                console.log("user.componentList pushed: ", user.componentList);
                user.save(function(err) {
                    if (err) {
                        req.status(500);
                        return req.json({
                            message: err.errmsg || err,
                            data: {}
                        });
                    }

                    res.status(201);
                    return res.json({
                        message: "created",
                        data: component
                    });
                });
            });
        }
    });
});

module.exports = router;