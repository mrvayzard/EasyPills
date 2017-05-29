/**
 * Created by Vayzard on 15.05.2017.
 */

var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var mhtToHtml = require('../mhtToHtml');

var app = express();

router.get('/:id', function(req, res, next) {
    var productId = req.params.id;

    Product.findById(productId, function (err, product) {
        Product.find( {codeATS: product.codeATS, registration: { $ne: product.registration } }, function (err, analogs) {
            if(product.codeATS === '')
                analogs = null;
            if (product.instructionUrl!=="#")
                mhtToHtml.convertToFile(product.instructionUrl, '../tempFiles/temp.html');
            res.render('item', { title: product.name, product: product, path: '../', analogs: analogs});
        });
    });
});

router.post('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    console.log(productId);
    res.redirect('/item/' + productId );
});

module.exports = router;
