/**
 * Created by Vayzard on 15.05.2017.
 */
var Product = require('../models/product.js');
var Price = require('../models/price.js');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/pills');

var requestify = require('requestify');
var cheerio = require('cheerio');

getBody(function (pr) {
    console.log(pr);
});

function getBody(callback) {
    Product.find(function (err, docs) {
        docs.forEach(function (doc) {
            console.log(doc.name);
            requestify.request('http://medbrowse.com.ua/search', {
                method: 'POST',
                body: {
                    searchstr: doc.name,
                    geo_trans: '',
                    geo_district: '',
                    geo_city: '187'
                },
                cookies: {
                    lang: 'UA',
                    language: 'UA'
                },
                dataType: 'form-url-encoded'
            }).fail(function(response) {
                // get the response body
                var link = response.getHeader('location');
                requestify.get(link, {cookies: {
                    lang: 'UA',
                    language: 'UA'
                }}).then(function(response) {
                    var body = response.body;

                    var $ = cheerio.load(body);

                    var html = "";
                    $('h3').each(function(j, itm){
                        $(this).find('a').removeAttr('href');
                    });


                    $('.alt-value').remove();
                    $('.responsive-secondary').remove();
                    $('.turnable-first').remove();
                    $('.local').remove();
                    $('.map').remove();
                    $('.local-u').remove();
                    var prices = [];
                    var b = $('.apteka').each(function(i, elem) {
                        if (i >= 10)
                            return;
                        html += $(this).html();
                        $(this).find('var').each(function(j, itm){prices.push($(this).text())});
                    });

                    var pr = new Price({
                        html: html,
                        priceArray: prices,
                        product: doc._id
                    });

                    pr.save();
                    callback(pr);
                });
            });
        });
    }).limit(3);
}