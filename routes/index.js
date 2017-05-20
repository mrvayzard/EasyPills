var express = require('express');
var router = express.Router();
var Product = require('../models/product');

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

var sortMethod = "rating";

/* GET home page. */
router.get('/', function(req, res, next) {
    page = 15;
    regex = new RegExp();
    Product.find(function (err, docs) {

        sortMethod = req.param('sort');
        if(sortMethod===undefined)
            sortMethod = 'rating';

        if(sortMethod==='name')
            docs.sort(compareName);
        else if(sortMethod==='price')
            docs.sort(comparePrice);
        else docs.sort(compareRating);

        var productChunks = [];
        var chunkSize = 3;
        for (var i=0; i<docs.length; i+=chunkSize) {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        productChunks = productChunks.slice(0,5);
        res.render('index', { title: 'Easy-Pills.com', products: productChunks, path: '/', sortMethod: sortMethod });
    });
});

router.post('/search', function (req, res, next) {
    page = 15;
    var searchValue = req.param('search_value', null);
    regex = new RegExp('^' + searchValue.toUpperCase());
    Product.find( { name: regex }, function (err, docs) {

        sortMethod = req.param('sort');
        if(sortMethod===undefined)
            sortMethod = 'rating';

        if(sortMethod==='name')
            docs.sort(compareName);
        else if(sortMethod==='price')
            docs.sort(comparePrice);
        else docs.sort(compareRating);

        var productChunks = [];
        var chunkSize = 3;
        for (var i=0; i<docs.length; i+=chunkSize) {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        productChunks = productChunks.slice(0,5);
        res.render('index', { title: 'Easy-Pills.com', products: productChunks, path: '/', sortMethod: sortMethod});
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

buildResultSet = function(docs) {
    var result = [];
    for(var object in docs){
        result.push(docs[object]);
    }
    return result;
}

router.get('/search_member', function(req, res) {
    var regex = new RegExp(req.query["term"], 'i');
    var query = Product.find({name: regex}, { 'name': 1 }).sort({"updated_at":-1}).sort({"created_at":-1}).limit(10);

    // Execute query in a callback and return users list
    query.exec(function(err, items) {
        if (!err) {

            // Method to construct the json result set
            var result = buildResultSet(items);
            res.send(result, {
                'Content-Type': 'application/json'
            }, 200);
        } else {
            res.send(JSON.stringify(err), {
                'Content-Type': 'application/json'
            }, 404);
        }
    });
});

var page = 15;
var regex = new RegExp();

router.get('/load', function(req, res) {

    console.log(page);
    console.log("fff");
    var sort123 = "name";
    var query = Product.find({name: regex}).sort({[sortMethod]:1}).skip(page).limit(3);

    // Execute query in a callback and return users list
    query.exec(function(err, items) {
        if (!err) {

            // Method to construct the json result set
            var result = buildResultSet(items);
            res.send(result, {
                'Content-Type': 'application/json'
            }, 200);
        } else {
            res.send(JSON.stringify(err), {
                'Content-Type': 'application/json'
            }, 404);
        }
    });
    page+=3;
});

module.exports = router;
