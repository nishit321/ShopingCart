var express = require('express');
var router = express.Router();
var {Product} = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup',(req,res)=>{
    req.flash('success1', 'This is a flash message using the express-flash module.');
   // var message = req.flash();
    res.render('users/signup',{csrfToken:req.csrfToken(),expressFlash: req.flash('success1'),success: req.session.success, errors: req.session.errors,message:req.flash('success')});
    req.session.errors = null;
  });
  
  router.post('/signup',passport.authenticate('local.signup',{
      successRedirect:'/user/profile',
      failureRedirect:'/user/signup',
      failureFlash:true 
  })); 
  
  router.get('/signin',(req,res)=>{
    req.flash('success1', 'This is a flash message using the express-flash module.');
   // var message = req.flash();
    res.render('users/signin',{csrfToken:req.csrfToken(),expressFlash: req.flash('success1'),success: req.session.success, errors: req.session.errors,message:req.flash('success')});
    req.session.errors = null;
  });
  
  router.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true 
  }));
  
  router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('users/profile');
  });

  router.get('/logout',isLoggedIn,(req,res,next)=>{
    req.logout();
    res.redirect('/');
  });

  module.exports = router;
  function isLoggedIn(req,res,next) {
      if(req.user){
        return next();
      }
      res.redirect('/');
  }