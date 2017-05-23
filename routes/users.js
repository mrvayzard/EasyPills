var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/info', function(req, res){
    res.redirect('/users/' + req.user.email);
});

router.post('/check_mail', function(req, res){

    User.getUserByMail(req.body.email, function(err, user){
        if(err) throw err;
        if(!user){
            res.send("true");
        } else {
            res.send("false");
        }

    });
});


router.post('/check_login', function(req, res){

    User.getUserByUsername(req.body.username, function(err, user){
        if(err) throw err;
        if(!user){
            res.send("true");
        } else {
            res.send("false");
        }

    });
});


// Register User
router.post('/register', function(req, res){
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.passwordtwo;
    var password2 = req.body.passwordthree;

    // Validation
    req.checkBody('email', 'Введіть пошту').notEmpty();
    req.checkBody('email', 'Введіть коректну пошту').isEmail();
    req.checkBody('username', 'Введіть логін').notEmpty();
    req.checkBody('passwordtwo', 'Введіть пароль').notEmpty();
    req.checkBody('passwordthree', 'Правильно введіть повторний пароль').equals(req.body.passwordtwo);

    var errors = req.validationErrors();

    if(errors){
        res.render('index',{
            errors:errors
        });
    } else {
        var newUser = new User({
            email:email,
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        res.render('register', {path: '../'});
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Невідомий користувач.'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Неправильний пароль.'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
        res.redirect('./');
    });

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'Ви успішно вийшли.');

    res.redirect('./');
});

module.exports = router;