/**
 * Created by Vayzard on 15.05.2017.
 */
var Product = require('../models/product.js');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/pills');

var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var crawler = require('crawler');
var fs = require('fs');

var products = [];
var mainUrls = [];
var pageUrls = [];
var itemUrls = [];
var urlAddress = 'http://drlz.com.ua/ibp/ddsite.nsf';

var getMainUrls = function () {

    for (var i=0; i<5; i++) {
        for (var j=1; j<10; j++) {
            mainUrls.push('http://drlz.com.ua/ibp/ddsite.nsf/all/shlist?opendocument&sym=20' + (12+ i) + 0 + j);
        }
        for (var j=10; j<13; j++) {
            mainUrls.push('http://drlz.com.ua/ibp/ddsite.nsf/all/shlist?opendocument&sym=20' + (12+ i) + j);
        }
    }

}

getMainUrls();

var cr1 = new crawler({
    maxConnections : 5,

    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = cheerio.load(res.body);
            var pageCount = $('a').slice(-1).attr('href');
            if(pageCount.indexOf("page=") > -1) {
                pageCount = pageCount.slice(pageCount.indexOf("page=") + 5, pageCount.indexOf('&sym'));
                for(var k=0; k<Number(pageCount); k++)
                    pageUrls.push(res.request.uri.href + '&lpage=' + (k+1));
            }

        }
        done();
    }
});

cr1.queue(mainUrls);

cr1.on('drain',function(){
    var cr2 = new crawler({
        maxConnections : 5,

        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = cheerio.load(res.body);
                var itemUrl;
                $('a').each(function (val, index) {
                    itemUrl=$(this).attr('href');
                    if(itemUrl.indexOf('&stype=') > -1) {
                        itemUrl = urlAddress + itemUrl.substring(2);
                        itemUrls.push(itemUrl);
                    }
                })
            }
            done();
        }
    });

    cr2.queue(pageUrls);

    cr2.on('drain',function(){
        var cr3 = new crawler({
            maxConnections : 5,

            callback : function (error, res, done) {
                if(error){
                    console.log(error);
                }
                else{
                    var $ = cheerio.load(res.body);
                    var temp;
                    var counter = 0;

                    var name;
                    var manufacturer;
                    var form;
                    var registration;
                    var orderMON;
                    var orderMONValidity;
                    var declarant;
                    var internationalName;
                    var synonymousName;
                    var activeIngredients;
                    var codeATS;
                    var dispensing;
                    var validity;

                    var instructionURL = $('a').slice(-1).attr('href');
                    if(instructionURL.indexOf('mht') > -1)
                        instructionURL = 'http://drlz.com.ua/ibp' + instructionURL.substring(5);
                    else instructionURL = '#';

                    console.log(instructionURL);

                    $('tr').each(function (val, index) {
                        temp=$(this).text();
                        if(temp.indexOf(':') > -1) {
                            counter++;
                            if (counter === 4)
                                name = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 5)
                                manufacturer = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 6)
                                form = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 7)
                                registration = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 8)
                                orderMON = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 9)
                                declarant = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 10)
                                internationalName = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 11)
                                synonymousName = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 12)
                                activeIngredients = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 13)
                                codeATS = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 14)
                                dispensing = temp.slice(temp.indexOf(':') + 1);
                            else  if (counter === 15)
                                validity = temp.slice(temp.indexOf(':') + 1);
                        }
                    })

                    products.push(new Product({
                        name: name,
                        manufacturer: manufacturer,
                        form: form,
                        registration: registration,
                        orderMON: orderMON,
                        orderMONValidity: orderMONValidity,
                        declarant: declarant,
                        internationalName: internationalName,
                        synonymousName: synonymousName,
                        activeIngredients: activeIngredients,
                        codeATS: codeATS,
                        dispensing: dispensing,
                        validity :validity,
                        rating: 0,
                        instructionUrl: instructionURL,
                        imagePath: '/images/item.jpg'
                    }));

                }
                done();
            }
        });

        cr3.queue(itemUrls);

        cr3.on('drain',function(){
            var done = 0;
            for (var i=0; i<products.length; i++) {
                products[i].save(function (err, result) {
                    done++;
                    if (done === products.length) {
                        exit();
                    }
                });
            }

            function exit() {
                mongoose.disconnect();
            }
            //fs.writeFileSync('./itemsInfo.json', JSON.stringify(itemUrls, null, 4));
        });
    });
});