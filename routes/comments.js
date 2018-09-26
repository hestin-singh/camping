var express = require('express')
var router = express.Router(); 
var Campground = require('../models/campground');
var Comment = require('../models/comment')

//=============================COMMENTS======================\\

router.get("/campgrounds/:id/comments/new",isLogged, (req,res)=>{
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render('comments/new', {campground:campground})
        }
    })
   
})
router.post("/campgrounds/:id/comments", isLogged,(req,res)=>{
    
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log('err');
            res.redirect('/campgrounds');
        }
        else{
            // console.log(req.body.comment)
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    
                    //add user name and id to comment
                    comment.author.id= req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+ campground._id);
                }
            })
        }
    })
});
function isLogged(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/login');
    }
}

module.exports = router;