/**
 * Created by Vayzard on 24.05.2017.
 */
var express = require('express');
var router = express.Router();

var app = express();

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/no-permission');
    }
}

router.get('/', ensureAuthenticated, function(req, res) {
    var products = null;
    res.render('cabinet', {path: '../', products: products});
});

module.exports = router;