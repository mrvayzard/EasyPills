var express = require('express');
var router = express.Router();
var Product = require('../models/product');

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err, docs) {
        if(req.param('sort')==='name')
            docs.sort(compareName);
        else if(req.param('sort')==='price')
            docs.sort(comparePrice);
        else docs.sort(compareRating);
        var productChunks = [];
        var chunkSize = 3;
        for (var i=0; i<docs.length; i+=chunkSize) {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        productChunks = productChunks.slice(0,5);
        res.render('index', { title: 'Easy-Pills.com', products: productChunks, path: '/' });
    });
});

router.post('/search', function (req, res, next) {
    var searchValue = req.param('search_value', null);
    Product.find( { name: {$regex : '^' + searchValue.toUpperCase()} }, function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i=0; i<docs.length; i+=chunkSize) {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('index', { title: 'Easy-Pills.com', products: productChunks, path: '/' });
    })
})

function compareName(a,b) {
    if (a.name.toLowerCase() < b.name.toLowerCase())
        return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase())
        return 1;
    return 0;
}

function comparePrice(a,b) {
    if (a.price < b.price)
        return -1;
    if (a.price > b.price)
        return 1;
    return 0;
}

function compareRating(a,b) {
    if (a.rating > b.rating)
        return -1;
    if (a.rating < b.rating)
        return 1;
    return 0;
}

module.exports = router;
