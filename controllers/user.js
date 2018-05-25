const express=require('express');
const router=express.Router();
var User=require('../models/user');

const passport=require('passport')

router.get('/',function (req,res) {
    res.render('index')
})

router.get('/signup',function (req,res) {
    res.render('signup',{usererror: req.flash('userError')});
})

router.post('/signup',passport.authenticate('local.signup',{


    failureRedirect: '/signup',
    failureFlash: true

}),function (req,res) {
    res.redirect('/profile')
})

router.get('/login',function (req,res) {
    res.render('login',{loggingerror: req.flash('loggingError'), passworderror: req.flash('passworderror')});
})
router.post('/login',passport.authenticate('local.login',{


    failureRedirect: '/login',
    failureFlash: true

}),function (req,res) {
    res.redirect('/profile')
})

router.get('/profile',isLoggedIn,function (req,res) {

    res.render('profile',{user:req.user});
})
router.get('/logout',function (req,res) {

    req.logout();
    res.redirect('/');
})



router.get('/login',function (req,res) {
    res.render('login');
})
module.exports =router;

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}