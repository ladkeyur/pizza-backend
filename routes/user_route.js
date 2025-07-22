const express =require('express')
const router = express.Router()
const {newuser, getuserdata,updatedata, deletedata, login, Authverify} = require('../controllers/user_controller')
const Auth = require('../middleware/auth_verify')
const {mailsend} = require('../controllers/mail_controller')



router.post('/',newuser)
router.get('/getdata',getuserdata)
router.put('/update/:id',updatedata)
router.delete('/delete/:id',deletedata)
router.post('/login',login)
router.post('/authverify',Auth,Authverify)
router.post('/sendemail',mailsend)


module.exports = router;