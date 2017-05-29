var mongoose = require('mongoose');

var PriceSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    html: String,
    priceArray: [Number]
});

module.exports = mongoose.model("Price", PriceSchema);