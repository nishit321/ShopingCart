var passport = require('passport');
var users = require('../models/user');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    users.findById(id,(err,docs)=>{
        done(err,docs);
    });
});

passport.use('local.signup', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true  
},(req,email,password,done)=>{

    req.checkBody('email','Invalid email').isEmail().notEmpty();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();

    if(errors){
        /*var message = [];
        errors.forEach((err)=>{
            message.push = err;
        });
        req.flash('success',message);*/
        req.session.errors = errors;
        req.session.success = false;
        return done(null,false);
    }
    users.findOne({'email':email},(err,docs)=>{
        if(err){
            return done(err);
        }if(docs){
            req.flash('success', 'Email is already in use.');
            return done(null,false);
        }
        var newUser = new users();
        newUser.email = email;
        newUser.password = encryptPassword(password);
        //console.log(password);
        
        newUser.save((err,docs)=>{
            if(err){
                return done(err);
            }
            return done(null,newUser);
        });
    });
}));
var encryptPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null,(err,hash)=>{    
    });
    //return 0;
}
passport.use('local.signin',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true  
},(req,email,password,done)=>{
    req.checkBody('email','Invalid email').isEmail().notEmpty();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();

    if(errors){
        req.session.errors = errors;
        req.session.success = false;
        return done(null,false);
    }
    users.findOne({'email':email},(err,docs)=>{
        if(err){
            return done(err);
        }if(!docs){
            req.flash('success', 'No User Found.');
            return done(null,false);
        }if(!docs.validPassword(password)){
            req.flash('success', 'Password Incorrect.');
            return done(null,false);
        }
        return done(null,docs);
    });
}));
