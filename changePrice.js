var Bookmark = require('./models/bookmark');
var Product = require('./models/product');
var Price = require('./models/price');
var ObjectId = require('mongodb').ObjectID;

var  mongoose = require('mongoose');

mongoose.connect('localhost:27017/pills');


function updatePrices() {
    Price.find(function (err, docs) {
        console.log("w");
        docs.forEach(function (doc) {
            Product.update (
                { _id: doc.product },
                { $set:
                    {
                        price: (Math.min.apply(Math, doc.priceArray) + " . . . " + Math.max.apply(Math, doc.priceArray) )
                    }
                },
                function () {
                    console.log("Done");
                }
            )
        });
    });
}

updatePrices();
