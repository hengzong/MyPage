//part of this code is from https://gitlab.com/hzong2/cs_498_mp3/
mongoose = require('mongoose');
var express = require('express'),
    router = express.Router({mergeParams: true});
    User = require('../models/user'),
    Component = require('../models/components');

    router.get('/', function(req, res){
        let user_name = req.params.user_name;
        console.log(user_name);
        User.findOne({"user_name": user_name}, function (err, doc) {
            if (err) {
                res.status(500);
                let message = err.errmsg || err;
                return res.json({
                    message: message,
                    data: {}
                });
            }
            if (doc === null) {
                res.status(404);
                return res.json({
                    message: "Not Found",
                    data: {}
                });
            }
            res.status(200);
            return res.json({
                message: "OK",
                data: doc
            });
        });
    });

    router.put('/', function (req, res) {
        let obj = req.body;
        let user_name = req.params.user_name;

        User.findOneAndUpdate({"user_name": user_name}, obj, {new: true}, function (err, doc){
            if (err) {
                res.status(500);
                let message = err.errmsg || err;
                return res.json({
                    message: message,
                    data: {}
                });
            }
            if (doc === null) {
                res.status(404);
                return res.json({
                    message: "Not Found",
                    data: {}
                });
            }

            res.status(200);
            return res.json({
                message: "Updated",
                data: doc
            });
        });
    });

    router.delete('/', function (req, res) {
        var user_name = req.params.user_name;
        
        User.findOneAndDelete({"user_name": user_name}, function (err, user) {
            if (err) {
                res.status(500);
                var message = err.errmsg || err;
                return res.json({
                    message: message,
                    data: {}
                });
            }

            if (user === null) {
                res.status(404);
                return res.json({
                    message: "Not Found",
                    data: {}
                });
            }

            // console.log(user.componentList);
            if (user.componentList.length !== 0) {
                Component.deleteMany({_id: {$in: user.componentList}}, function(err, components) {
                    res.status(200);
                    return res.json({
                        message: "Deleted",
                        data: {}
                    });
                });
            }
            else {
                res.status(200);
                return res.json({
                    message: "Deleted",
                    data: {}
                });
            }
        });
    });

module.exports = router;
