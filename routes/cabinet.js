/**
 * Created by Vayzard on 24.05.2017.
 */
var express = require('express');
var router = express.Router();

var app = express();

router.get('/', function(req, res) {
        var products = null;
        res.render('cabinet', {path: '../', products: products});
    });

module.exports = router;