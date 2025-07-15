const categorymodel = require('../Models/category_model')

//#region add category
    const addcategory = async(req,res) =>{
        try{
            const category = req.body
            if(!category){
            return res.status(400).json({ status: false, data: { message: "Category is null" } });
            }
            const dbcategory = new categorymodel({categoryname:category.categoryname})
            dbcategory.save()
            return res.status(200).json({status:true,data:{message:"add category successfuly",data:dbcategory}})
            
        }
        catch(error){
            console.log(error)
            return res.status(500).json({status:false,data:{message:'internal server error'}})

        }
    }
//#endregion

//#region get data 
    const getdata = async(req,res) => {
        try{

            const category = await categorymodel.find()
            return res.status(200).json({status:true,data:{message:"add category successfuly",data:category}})

        }
        catch(error){
            console.log(error);
            return res.status(500).json({status:false,data:{message:'internal server error'}})
        }

    }
//#endregion

//#region update data
    const updatedata = async(req,res) =>{
        try{
            const category = req.body
            const id = req.params.id
            if(!category){
            return res.status(400).json({ status: false, data: { message: "Category is null" } });
            }

            const dbcategory =await categorymodel.updateOne({_id:id},{categoryname:category.categoryname})
            return res.status(200).json({status:true,data:{message:"category update successfuly",data:category}})
            
        }
        catch(error){
            console.log(error);
            return res.status(500).json({status:false,data:{message:'internal server error'}})
        }

    }
//#endregion

//#region delete category
    const deletedata = async(req,res) =>{
        try{
            const id = req.params.id

            const dbcategory = await categorymodel.deleteOne({_id:id})
            return res.status(200).json({status:true,data:{message:"category delete successfuly"}})
        }
        catch(error){
            console.log(error);
            return res.status(500).json({status:false,data:{message:'internal server error'}})
        }


    }
//#endregion

module.exports ={addcategory,getdata,updatedata,deletedata}