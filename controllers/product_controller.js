const productmodel = require('../Models/product_model')
const categorymodel = require('../Models/category_model')
const sizemodel = require('../Models/size_model')
const addproduct = async(req,res) =>{
    try{
        const product = req.body

        if(!product){
            return res.status(400).json({ status: false, data: { message: "Product is null" } });
        }
        const procat =  await  categorymodel.findById(product.category)
        console.log(procat,'procate');
        
        if(!procat){
            return res.status(400).json({ status: false, data: { message: "Category not found" } });
        }
        
        const sizes = JSON.parse(req.body.sizes)

        const vsizes = await Promise.all(
            sizes.map(async (size)=>{
                const prosize = await sizemodel.findById(size.size)
                if (!prosize) throw new Error("Size not found: " , size.size);
                return {
                    size: prosize._id,
                    price: size.price
                };
            })
        )

        const uploadimage = req.files.map(file => ({
            filename: file.path,
            filepath: file.path
        }));

        

        const newproduct = new productmodel({
            
            productname:product.productname,
            images:uploadimage,
            sizes:vsizes,    
            ingredients:product.ingredients,
            description:product.description,
            review:product.review,
            category:procat._id
        })

        await newproduct.save()
            return res.status(200).json({ status: true, data: { message: "Product add successfully",data:newproduct } });
    }
    catch(error){
        console.log(error);
        
        return res.status(500).json({
            status: false,
            data: { message: 'Internal server error', error: error.message }
        });
    }
}


//#region getdata 
    const getproduct = async(req,res) =>{
        try{
            const product = await productmodel.find().populate('category','categoryname').populate('sizes.size','size sizename')
            return res.status(200).json({status:true,data:{message:"get data successfuly",data:product}})
        }
        catch(error){
            console.log(error);
        }
    }
//#endregion

module.exports={addproduct,getproduct}