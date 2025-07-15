const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema({
    sizename:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('size',sizeSchema)