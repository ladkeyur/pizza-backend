const jwt = require("jsonwebtoken")
const {jwt_secret_key} = require("../utility/config")
const usermodel = require("../Models/user_model")

const Auth = async(req, res, next) =>{
    const token = req.headers.authorization
    console.log(token)
    if(!token){
        return res.status(500).json({status:false, data:{message:"Your token is null"}})
    }
    try{
    
        const user =  jwt.verify(token, jwt_secret_key)
        if(!user){
            return res.status(500).json({status:false, data:{message:"Invalid token"}})

        }
        console.log(user);
        
        const dbuser = await usermodel.findById({_id:user.id}).select("-password")
        if(!dbuser){
            return res.status(500).json({status:false, data:{message:"Unauthoreized access"}})
        }
        console.log(dbuser)

        req.user = dbuser;
        next()
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false, data:{message:"Internal server error", data:error}})
    }
}



module.exports = Auth