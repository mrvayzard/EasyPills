/**
 * Created by Vayzard on 20.05.2017.
 */
var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
    page = 15;
    var query = Product.find().sort({"date" : -1}).limit(10);
    query.exec(function (err, items) {
        res.render('admin', {products: items, path: '../'});
    })
});

router.get('/add', function (req, res, next) {
    res.render('edit', {path: '/../'});
});

router.post('/edit', function (req, res, next) {
    Product.findById(req.param('edit'), function (err, product) {
        res.render('edit', {path: '/../', product: product})
    });
});

router.post('/delete', function (req, res, next) {
    console.log(req.param("delete"));
    Product.remove({"_id": ObjectId((req.param("delete")).toString())}, function () {
        res.redirect('/admin');
    });
});

router.post('/save', function (req, res, next) {

    Product.findById(req.body.id, function (err, product) {
        if (product!==undefined) {
            Product.update(
                { _id: ObjectId(req.body.id) },
                { $set:
                    {
                        name : req.body.name,
                        internationalName : req.body.international_name,
                        manufacturer : req.body.manufacturer,
                        form : req.body.form,
                        activeIngredients : req.body.active_ingredients,
                        validity : req.body.validity,
                        //image : req.body.image,
                        image: '/images/item.jpg',
                        instructionUrl : req.body.instruction,
                        date: new Date()
                    }
                }
            ,function () {
                    console.log("Done");
                })
        }
        else {
            let newvalue = new Product({
                name : req.body.name,
                internationalName : req.body.international_name,
                manufacturer : req.body.manufacturer,
                form : req.body.form,
                activeIngredients : req.body.active_ingredients,
                validity : req.body.validity,
                //image : req.body.image,
                image: '/images/item.jpg',
                instructionUrl : req.body.instruction,
                date: new Date()
            });
            newvalue.save();
        }
    });
    res.redirect('/admin');
});

var page = 10;

router.get('/load', function(req, res) {

    console.log(page);
    var query = Product.find({name: regex}).sort({"date" : -1}).skip(page).limit(3);

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
