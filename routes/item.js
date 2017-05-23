/**
 * Created by Vayzard on 15.05.2017.
 */

var express = require('express');
var router = express.Router();
var Product = require('../models/product');

var app = express();

app.get('/search_member', function(req, res) {
    var regex = new RegExp(req.query["term"], 'i');
    var query = User.find({fullname: regex}, { 'fullname': 1 }).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);

    // Execute query in a callback and return users list
    query.exec(function(err, users) {
        if (!err) {
            // Method to construct the json result set
            var result = buildResultSet(users);
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


/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var productId = req.params.id;


    Product.findById(productId, function (err, product) {
        Product.find( {codeATS: product.codeATS, registration: { $ne: product.registration } }, function (err, analogs) {
            if(product.codeATS === '')
                analogs = null;
            res.render('item', { title: product.name, product: product, path: '../', analogs: analogs});
        });
    });
});

module.exports = router;
