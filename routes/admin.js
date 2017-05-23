/**
 * Created by Vayzard on 20.05.2017.
 */
var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', function(req, res, next) {
    Product.find(function (err, products) {
            res.render('admin', {products: products.slice(15), path: '/'});
        })
});

router.get('/add', function (req, res, next) {
    res.render('edit', {path: '/../'});
})

module.exports = router;
