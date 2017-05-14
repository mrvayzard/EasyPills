var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String},
    name: {type: String, required: true},
    rating: {type: Number},
    mainSubstance: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    offerCount: {type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);

