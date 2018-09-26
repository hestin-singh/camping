var express = require('express')
var router = express.Router(); 
var Campground = require('../models/campground');
var Comment = require('../models/comment')


router.get('/campgrounds',(req,res)=>{
    //    Get all campgrond from databdase
        Campground.find({},(err, allCampgrounds)=>{
            if(err){
                console.log(err);
            }
            else{
               res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
            }
        })
        
    })
    //Create route
router.post('/campgrounds',isLogged,(req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
     var description = req.body.description;
    var newCampground = {name: name, image: image, description:description};
    // campgrounds.push(newCampground);
    // crate a new campground and save it to data base
    Campground.create(newCampground,(err, newlyCreated)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('campgrounds/campgrounds')
        }
    })        
    });
    //New- SHOW FORM
    router.get('/campgrounds/new',(req,res)=>{
        res.render("campgrounds/new");
    })
    router.get("/campgrounds/:id",(req,res)=>{
        //find the dog pic with given id
        // req.parms.id = it give id
        Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
            if(err){
                console.log(err);
            }
            else{
                
                res.render("campgrounds/show", {campground: foundCampground})
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