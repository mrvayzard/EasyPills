/**
 * Created by Vayzard on 24.05.2017.
 */
var express = require('express');
var router = express.Router();
var Bookmark = require('../models/bookmark');
var Product = require('../models/product');
var ObjectId = require('mongodb').ObjectID;

var app = express();

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/no-permission');
    }
}

router.get('/', ensureAuthenticated, function(req, res) {
    //console.log(req.user._id);
    Bookmark.find( {user: req.user._id}, function (err, items){
        var p = [];
        items.forEach(function (item) {
            Product.findOne( {_id: item.item}, function (err2, doc) {
                p.push(doc);
            });
        });
        p.sort();
        res.render('cabinet', {path: '../', products: p});
    })
});

router.post('/delete', ensureAuthenticated, function (req, res) {
    Bookmark.remove({item: ObjectId((req.param("delete")))}, function () {
        res.redirect('/cabinet');
    });
});

module.exports = router;