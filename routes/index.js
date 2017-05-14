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
        docs.sort(compareName);
        var productChunks = [];
        var chunkSize = 3;
        for (var i=0; i<docs.length; i+=chunkSize) {
          productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('index', { title: 'Easy-Pills.com', products: productChunks });
    });
});

router.post('/search', function (req, res, next) {
    var searchValue = req.param('search_value', null);
    Product.find( { name: searchValue }, function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i=0; i<docs.length; i+=chunkSize) {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('index', { title: 'Easy-Pills.com', products: productChunks });
    })
})

function compareName(a,b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
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
    if (a.rating < b.rating)
        return -1;
    if (a.rating > b.rating)
        return 1;
    return 0;
}

module.exports = router;
