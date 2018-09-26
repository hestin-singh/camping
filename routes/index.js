var express = require('express')
var router = express.Router(); 
var passport = require('passport');
var User = require('../models/user');

router.get('/',(req,res)=>{
    res.render('campgrounds/landing');
})
//Index route


//===============================Auth routes ===========================\\
router.get('/register',(req,res)=>{
    res.render('register');
});

router.post('/register',(req,res)=>{
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password,(err,user)=>{
        if(err){
            console.log(err);
             return res.render('register');
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect('/campgrounds');
            })
        }

    })
});
//========================================================\\
//==============Login form==============================
router.get('/login', (req,res)=>{
    res.render('login');
})
//app.post('/login', middleware, callback)
router.post('/login', passport.authenticate('local',
{
    successRedirect :"/campgrounds",
    faliureRedirect:'/login'
}),(req,res)=>{

});
//logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/campgrounds')
})

function isLogged(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/login');
    }
}
module.exports = router;