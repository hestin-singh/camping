const express    = require('express');
const app        = express();
const bodyparser = require("body-parser");
const mongoose   = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User          = require('./models/user');


var seedDB           = require('./seeds')
var Campground       = require('./models/campground');
var Comment          = require('./models/comment');
var commentRoutes    = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes      = require('./routes/index');

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.static(__dirname +'/public'));
seedDB();
//===================Passport======================\\
app.use(require('express-session')({
    secret: "Hello is olleh",
    resave:false,
    saveUninitalized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser= req.user;
    next();
})

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



app.listen(8080,()=>{
    console.log("the server is running at port 8080");
})