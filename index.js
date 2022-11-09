require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const app = express();
app.use(express.static('assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'Buy A Phone',
    secret: 'anything',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB,
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){}
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server up on ${port}`);
});