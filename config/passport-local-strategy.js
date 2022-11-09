const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: 'true'
    },
    function(req, email, password, done){
        //find user and establish id
        User.findOne({email: email},function(err,user){
            if(err){
                return done(err);
            }

            if(!user || user.password != password){
                return done(null, false);
            }
            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
});

//deserializing the user from key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if user signed in then pass request to next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user not signed in
    return res.redirect('/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;