var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: false},
    rating: {type: Number, required: false},
    price: {type: String, required: false},
    offerCount: {type: Number, required: false},
    instructionUrl: {type: String, required: false},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    form: {type: String, required: true},
    registration: {type: String, required: false},
    orderMON: {type: String, required: false},
    orderMONValidity: {type: String, required: false},
    declarant: {type: String, required: false},
    internationalName: {type: String, required: false},
    synonymousName: {type: String, required: false},
    activeIngredients: {type: String, required: true},
    codeATS: {type: String, required: false},
    dispensing: {type: String, required: false},
    validity: {type: String, required: true},
    date: {type: Date, required: false}

});

module.exports = mongoose.model('Product', schema);

