var mongoose = require('mongoose')

// creating schema of campground
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String,
    
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
    ]
});
// Converting schema to model and exporting
 

module.exports = mongoose.model("Campground", campgroundSchema);
