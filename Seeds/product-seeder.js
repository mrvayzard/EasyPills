/**
 * Created by Vayzard on 14.05.2017.
 */
var Product = require('../models/product.js');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/pills');

var products = [
    new Product({
        imagePath: 'https://medi.ru/images/2501.jpg',
        name: 'Лазолван Уно :)',
        rating: 40,
        mainSubstance: 'лазолувій',
        category: 'засіб від кашлю',
        price: '333 ... 111 грн',
        offerCount: 15,
        url: 'item247.html'
    }),
    new Product({
        imagePath: 'https://media.add.ua/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/a/l/altejka-sirop-200/add.ua-galichfarm-aoot-(ukraina,-l-vov)-altejka-galichfarm-sirop-200-ml-31.jpg',
        name: 'Алтейка (сироп) 2',
        rating: 60,
        mainSubstance: 'алтей лікарський',
        category: 'засіб від кашлю',
        price: '187 ... 255 грн',
        offerCount: 21
    }),
    new Product({
        imagePath: 'http://oblepiha.com/uploads/posts/2014-09/1411559319_1.jpg',
        name: 'Ацетилсаліцилова кислота',
        rating: 60,
        mainSubstance: 'фцетилсаліцилова кислота',
        category: 'від усього',
        price: '2 ... 4 грн',
        offerCount: 122
    }),
    new Product({
        imagePath: 'https://medi.ru/images/2501.jpg',
        name: 'Лазолван',
        rating: 60,
        mainSubstance: 'лазолувій',
        category: 'засіб від кашлю',
        price: '333 ... 111 грн',
        offerCount: 15
    }),
    new Product({
        imagePath: 'https://media.add.ua/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/a/l/altejka-sirop-200/add.ua-galichfarm-aoot-(ukraina,-l-vov)-altejka-galichfarm-sirop-200-ml-31.jpg',
        name: 'Алтейка (сироп) 2',
        rating: 60,
        mainSubstance: 'алтей лікарський',
        category: 'засіб від кашлю',
        price: '187 ... 255 грн',
        offerCount: 21
    }),
    new Product({
        imagePath: 'http://oblepiha.com/uploads/posts/2014-09/1411559319_1.jpg',
        name: 'Ацетилсаліцилова кислота',
        rating: 80,
        mainSubstance: 'фцетилсаліцилова кислота',
        category: 'від усього',
        price: '2 ... 4 грн',
        offerCount: 122
    }),
    new Product({
        imagePath: 'http://oblepiha.com/uploads/posts/2014-09/1411559319_1.jpg',
        name: 'Ацетилсаліцилова кислота',
        rating: 60,
        mainSubstance: 'фцетилсаліцилова кислота',
        category: 'від усього',
        price: '2 ... 4 грн',
        offerCount: 122
    })
];

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