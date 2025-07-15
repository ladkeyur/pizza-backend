const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary.config')


const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'productimages',
        allowed_formats:['jpg','png','jpeg','webp']
    }
})
const upload = multer({
    storage:storage,
    limits:{fieldSize: 10 * 1024 * 1024}
})

module.exports=upload