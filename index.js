const express = require('express')
const conn = require('./utility/connectdb')
const cors = require('cors')
const userroter = require('./routes/user_route')
const upload = require('./utility/upload')
const path = require('path')
const categoryrouter = require('./routes/category_route')
const productrouter = require('./routes/product_route')
const sizerouter = require('./routes/size_route')
const orderrouter = require('./routes/order_route')
const app = express();
const port =5000;
app.use(cors())
app.use(express.json())
app.use('/api',userroter)
app.use('/api',categoryrouter)
app.use('/product',productrouter)
app.use('/size',sizerouter)
app.use('/order', orderrouter)

const startServer = async() =>{
    try{
        await conn()
        app.listen(port,()=>{
            console.log(`Server is running on a ${port}`);
        })
    }
    catch{
        console.log('failed to start Server',error)
        process.exit(1)
    }
}

startServer()