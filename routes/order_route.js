const express = require('express')
const router = express.Router()
const {addorder} = require('../controllers/order_controller')

router.post ('/addorder/:id',addorder)

module.exports=router