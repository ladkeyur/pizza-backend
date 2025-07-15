const sizemodel = require('../Models/size_model')

const addsize = async(req,res) =>{
    try{
        const size = req.body
        if(!size){
            return res.status(400).json({ status: false, data: { message: "Category is null" } });
        }

        const dbsize = new sizemodel({sizename:size.sizename})
        dbsize.save()

        return res.status(200).json({status:true,data:{message:'Size Add Successfully',dbsize}})
    }
    catch(error){
        console.log(error); 
        return res.status(500).json({status:false,data:{message:'internal server error'}})
    }
}

const getsize = async(req,res) =>{
    try{
        const size = await sizemodel.find()
        res.status(200).json({status:true,data:{message:'Get Size Data Successfully',data:size}})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: false, data: { message: "Internal Server Error" } });
        
    }
}

const updatesize = async(req,res) =>{
    try{
        const size = req.body
        const id= req.params.id
        if(!size){
            return res.status(400).json({ status: false, data: { message: "Size is null" } });
        }

        const dbsize = await sizemodel.updateOne({_id:id},{sizename:size.sizename})
        return res.status(200).json({status:true,data:{message:'Updata size Successfully',data:size}})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: false, data: { message: "Internal Servsr Error" } });
        
    }
}

const deletesize = async(req,res) =>{
    try{
        const id = req.params.id

        const dbsize = await sizemodel.deleteOne({_id:id})
        return res.status(200).json({status:true,data:{message:'Size Delete Successfully'}})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: false, data: { message: "Internal Servsr Error" } });
    }
}

module.exports = {addsize,getsize,updatesize,deletesize}