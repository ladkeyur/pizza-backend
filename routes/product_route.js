const express = require('express')
const router = express.Router()
const upload = require('../utility/upload')
const {addproduct, getproduct} = require('../controllers/product_controller')

router.post('/addproduct',upload.array('images'),addproduct)
router.get('/getproductdata',getproduct)

module.exports=router