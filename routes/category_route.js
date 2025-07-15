const express = require('express')
const router = express.Router()
const {addcategory,getdata,updatedata,deletedata} = require('../controllers/category_controller')

router.post('/addcategory',addcategory)
router.get('/getcategory',getdata)
router.put('/updatecategory/:id',updatedata)
router.delete('/deletecategory/:id',deletedata)

module.exports=router