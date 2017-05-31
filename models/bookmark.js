/**
 * Created by Vayzard on 31.05.2017.
 */
var mongoose = require('mongoose');

var BookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);