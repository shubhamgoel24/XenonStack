const User = require('../models/user');
const fs = require('fs');
const path = require('path');

//render sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_up', {})
}
//render sign in page 
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {})
}

//get sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log("Error in finding user in sign up");
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log("Error in creating user");
                    return;
                }
                req.login(user, function (err) {
                    if ( ! err ){
                        res.redirect('/');
                    } else {
                        console.log("Error in Logging in user");
                        return;
                    }
                })
            });
        }
        else{
            return res.redirect('back');
        }
    });
}
module.exports.createSession = function(req, res){
    return res.redirect('/');
}
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { console.log("Error in Logging out user"); };
    });
    return res.redirect('/');
}