/**
 * Created by Vayzard on 15.05.2017.
 */

var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Price = require('../models/price');
var mhtToHtml = require('../mhtToHtml');

var app = express();

router.get('/:id', function(req, res, next) {
    var productId = req.params.id;

    Product.findById(productId, function (err, prod) {
        Price.findOne( {product: prod._id}, function (err, price) {
            Product.find( {codeATS: prod.codeATS, registration: { $ne: prod.registration } }, function (err, analogs) {
                if(prod.codeATS === '')
                    analogs = null;
                if (prod.instructionUrl!=="#")
                    mhtToHtml.convertToFile(prod.instructionUrl, '../tempFiles/temp.html');
                res.render('item', { title: prod.name, product: prod, path: '../', analogs: analogs, price: price.html.replace(/\r\n|\n|\r/g, '') });
            });
        });
    });
});

router.post('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    console.log(productId);
    res.redirect('/item/' + productId );
});

module.exports = router;
