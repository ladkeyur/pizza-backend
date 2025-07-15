const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    
    productname:{
        type:String,
        required:true
    },
    images:[
        {
            filename:String,
            filepath:String
        }
    ],
    sizes:[{
        
        size:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'size',
            required:true
        },
        price:{
            type:Number,
            required:true
        },
    }],
    ingredients:{
        type:String,
        // require:true
    },
    description:{
        type:String,
        // required:true
    },
    review:{
        type:String,
        
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        
    },
},{timestamps:true})

module.exports = mongoose.model('product',productSchema)