const mongoose = require('mongoose')
const {MONGODB_URL} = require('./config')

const connectdb = async() =>{
    try{
        await mongoose.connect(MONGODB_URL)
        // console.log(MONGODB_URL)
        console.log("database connection successfully")
    }
    catch(error){
        if(error.name === 'MongooseServerSelectionError')
            {
                console.log('Error:Connection refused')
                console.log(error);
                
            }
            else{
                console.log('Error while conncting to database servser')
            }
            process.exit(1)
    }

}
module.exports=connectdb