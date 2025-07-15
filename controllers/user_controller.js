const usermodel = require('../Models/user_model')
const jwt = require('jsonwebtoken')
const {jwt_secret_key} = require('../utility/config')
const bcrypt = require('bcrypt')

//#region  ner user
const newuser = async(req,res)=>{
    try{
        const user = req.body;
        if(!user){
            return res.status(400).json({status:false, data:{message:"user is null"}})
        }

        const hashpwrd = await  bcrypt.hash(user.password,8)
        const dbuser =new usermodel({username:user.username,email:user.email,password:hashpwrd,mobileno:user.mobileno,address:user.address,houseno:user.houseno,pincode:user.pincode,city:user.city,usertype:user.usertype})
        await dbuser.save()

        return res.status(200).json({status:true,data:{message:"user create successfuly",data:dbuser}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,data:{message:'internal server error'}})
    }
}
//#endregion

//#region get user data

const getuserdata = async(req,res) =>{
    try{
        const user = await usermodel.find()
        return res.status(200).json({status:true,data:{message:"get user data success",data:user}})
    }
    catch{
        console.log(error);
        return res.status(500).json({status:false,data:{message:'internal server error'}})        
    }
}
//#endregion

//#region update data

const updatedata = async(req,res) => {
    try{
        const id = req.params.id
        const user = req.body
        if(!user){
            return res.stutus(400).json({status: false, data:{message:"user is null"}})
        }

        const dbuser = await usermodel.updateOne({_id:id},{username:user.username,email:user.email,password:user.password,mobileno:user.mobileno,address:user.address,houseno:user.houseno,pincode:user.pincode,city:user.city})

        return res.status(200).json({status:true,data:{message:"user update successfuly",data:user}})

    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,data:{message:'internal server error'}})
    }
}
//#endregion

//#region delete user data
    const deletedata= async(req,res) =>{
        try{
            const id = req.params.id 
            const user= req.body
            if(!user){
            return res.stutus(400).json({status: false, data:{message:"user is null"}})
            }

            const dbuser = await usermodel.deleteOne({_id:id},{username:user.username,email:user.email,password:user.password,address:user.address,pincode:user.pincode,mobileno:user.mobileno})
            console.log(user)
            return res.status(200).json({status:true,data:{message:"user delete successfuly",data:user}})

    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,data:{message:'internal server error'}})
    }

        
    } 
//#endregion

//#region login
    const login = async(req,res) => {
        try{
           const user = req.body

           if(!user){
            return res.status(400).json({status: false, data:{message:"user is null"}})
           }
           const dbuser = await usermodel.findOne({email:user.email})
           if (!dbuser){
            return res.status(400).json({status: false, data:{message:"Email id is not registered."}})
           }
           console.log(dbuser)
           const match = await bcrypt.compare(user.password,dbuser.password)

           if(!match){
            return res.status(400).json({status: false, data:{message:"Invalid Password."}})
           }

           const token = jwt.sign({id:dbuser._id},jwt_secret_key)
           return res.status(200).json({status:true,data:{message:"login Successfully",data:dbuser,token:token}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,data:{message:'internal server error'}})
    }    
        
}
//#endregion

//#region  auth verify

    const Authverify = async(req,res) =>{
        return res.status(200).json({status:true, data:{message:"Successfully verified", data:req.user}})
    }

//#endregion

module.exports ={newuser,getuserdata,updatedata,deletedata,login,Authverify}