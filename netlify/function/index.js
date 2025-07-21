const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')
const conn = require('../../utility/connectdb')
const userroter = require('../../routes/user_route')
const productrouter = require('../../routes/product_route')
const categoryrouter = require('../../routes/category_route')
const sizerouter = require('../../routes/size_route')
const orderrouter = require('../../routes/order_route')
const router = express.Router()

const app = express()

app.use(cors())
app.use(express.json())


// app.use((req, res, next) => {
//     if (
//         req.headers['content-type'] &&
//         req.headers['content-type'].includes('application/json')
//     ) {
//         let raw = '';
//         req.on('data', chunk => (raw += chunk));
//         req.on('end', () => {
//             try {
//                 req.body = JSON.parse(raw);
//                 console.log('✅ Parsed body:', req.body);
//             } catch (e) {
//                 console.log('❌ JSON parse error:', e.message);
//                 req.body = {};
//             }
//             next();
//         });
//     } else {
//         next();
//     }
// })

conn()
router.get('/ping', (req, res) => {
    res.json({ message: 'pong ✅ from  Netlify serverless Express' })
});

router.use('/api',userroter)
router.use('/api',categoryrouter)
router.use('/product',productrouter)
router.use('/size',sizerouter)
router.use('/order',orderrouter)

module.exports.handler=serverless(app)

