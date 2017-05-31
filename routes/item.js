/**
 * Created by Vayzard on 15.05.2017.
 */

var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Bookmark = require('../models/bookmark');
var Price = require('../models/price');
var mhtToHtml = require('../mhtToHtml');
ObjectId = require('mongodb').ObjectID;


var app = express();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/no-permission');
    }
}

function getUserId(req, res, next) {
    return req.user._id;
}

router.get('/:id', function(req, res, next) {
    var productId = req.params.id;

    Product.findById(productId, function (err, prod) {
        if(prod!==undefined && prod!=null) {
            Price.findOne({product: prod._id}, function (err, price) {
                Product.find({codeATS: prod.codeATS, registration: {$ne: prod.registration}}, function (err, analogs) {
                    if (prod.codeATS === '')
                        analogs = null;
                    if (prod.instructionUrl !== "#")
                        mhtToHtml.convertToFile(prod.instructionUrl, '../tempFiles/temp.html');
                    var newPrice;
                    if (price === null)
                        newPrice = "<p>Недоступно</p>";
                    else
                        newPrice = price.html.replace(/\r\n|\n|\r/g, '');
                    var added = false;
                    Bookmark.findOne({item: ObjectId(productId)}, function (err, doc) {
                        if (doc !== null)
                            added = true;
                        res.render('item', {
                            title: prod.name,
                            product: prod,
                            path: '../',
                            analogs: analogs,
                            price: newPrice,
                            added: added
                        });
                    });
                });
            });
        }
        else
            res.redirect('../404');
    });
});

router.post('/add/:id', ensureAuthenticated, function(req, res, next) {
    var productId = req.params.id;
    var userId = getUserId(req, res, next);
    var newValue = new Bookmark({
        user : userId,
        item: ObjectId(productId)
    });
    newValue.save();
    //console.log(getUserId(req, res, next));
    res.redirect('/item/' + productId );
});

router.post('/delete/:id', ensureAuthenticated, function (req, res) {
    var productId = req.params.id;
    Bookmark.remove({item: ObjectId(productId)}, function () {
        res.redirect(req.get('referer'));
    });
});

router.post('/rating', ensureAuthenticated, function (req, res) {
    Product.findOne({_id: ObjectId(req.body.id)}, function (err, doc) {
        var ratingCount = doc.ratingCount+1;
        var rating = ((doc.rating*(ratingCount-1)) + Number(req.body.rating))/ratingCount;
        Product.update(
            { _id: ObjectId(req.body.id) },
            { $set:
                {
                    rating: rating,
                    ratingCount: ratingCount
                }
            }
            ,function () {
                console.log("Done");
                res.send(rating.toString());
            })
    });
});


module.exports = router;
