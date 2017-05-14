/**
 * Created by Vayzard on 15.05.2017.
 */

var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var productId = req.params.id;
    Product.findById(productId, function (err, product) {
        res.render('item', { title: product.name, product: product, path: '../'});
    });
});

module.exports = router;
