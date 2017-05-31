var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    value: Number
});

module.exports = mongoose.model("Rating", RatingSchema);

/**
 * Created by Vayzard on 31.05.2017.
 */
