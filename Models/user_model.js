const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    
    username:{
        type:String,
         required:true
    },
    email:{
        type:String,
         required:true
    },
    password:{
        type:String,
         required:true
    },
    mobileno:{
        type:Number,
         require:true
    },
    address:{
        type:String,
        require:true
    },
    houseno:{
        type:Number,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    pincode:{
        type:Number,
        require:true
    },
    usertype:{
        type:String,
         required:true
    }

},{timestamps:true})

module.exports =mongoose.model('user',userSchema)