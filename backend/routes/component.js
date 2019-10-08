mongoose = require('mongoose');
var express = require('express'),
router = express.Router({mergeParams: true}),
Componnet = require('../models/components'),
User = require('../models/user');


router.get('/', function(req, res) {
    var id = req.params.id;
    Componnet.findOne({_id: id}, function(err, doc){
        if(err) {
            res.status(500);
            return res.json({
                message: err.errmsg || err,
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
            message: "ok",
            data: doc
        });
    })
});

router.put('/', function(req, res) {
    var obj = req.body;
    var id = req.params.id;

    var user_name = req.body.user_name || "";
    if (user_name !== "") {
        res.status(400);
        return res.json({
            message: "user_name can not be changed",
            data: {}
        });
    }

    Componnet.findOneAndUpdate({_id: id}, obj, {new: true}, function(err, doc) {
        if (err) {
            res.status(500);
            return res.json({
                message: err.errmsg || err,
                data: {}
            });
        }

        if(doc === null) {
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

router.delete('/', function(req, res) {
    var id = req.params.id;

    Componnet.findOneAndDelete({_id: id}, function(err, component) {
        if(err) {
            res.status(500);
            return res.json({
                message: err.errmsg || err,
                data: {}
            });
        }

        if(component === null) {
            res.status(404);
            return res.json({
                message: "Not Found",
                data: {}
            });
        }

        User.findOne({user_name: component.user_name}, function(err, user) {
            if(err) {
                res.status(500);
                return res.json({
                    message: err.errmsg || err,
                    data: {}
                });
            }
            var list = user.componentList;
            console.log("before: ", list);
            for (var i = 0; i < list.length; i++) {
                if (list[i] == id) {
                    list.splice(i, 1);
                    i--;
                }
            }
            console.log("after: ", list);
            user.componentList = list;
            user.save(function(err) {
                if(err) {
                    res.status(500);
                    return res.json({
                        message: err.errmsg || err,
                        data: {}
                    });
                }

                res.status(200);
                return res.json({
                    message: "Deleted",
                    data: {}
                });
            });
        });
        
    });
});

module.exports = router;