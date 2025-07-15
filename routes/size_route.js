const express = require('express')
const router = express.Router()
const {addsize,getsize,updatesize,deletesize} = require('../controllers/size_controller')
const { route } = require('./category_route')

router.post('/addsize',addsize)
router.get('/getsizedata',getsize)
router.put('/updatedata/:id',updatesize)
router.delete('/deletedata/:id',deletesize)

module.exports = router