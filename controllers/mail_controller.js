const sendmail = require("../utility/nodemailer")
// const uploadimg = require('../utility/upload')

const mailsend = async(req,res) => {
    const {to,subject,text,html} = req.body;
    if(!to || !subject){
        return res.status(400).json({message:'to and subject are required'})
    }

    const success = await sendmail(to,subject,text,html)

    if(success){
        return res.status(200).json({message:'Email sent successfully'})
    }
    else{
        return res.status(500).json({message:'Failed to send email'})
    }
}

// const upload = (req,res) =>{
//     const filename = req.body
//     file(file=> file.filename)
//     return res.status(200).json({status:true,data:{message:'image uploading successfully',data:filename}})
// } 


module.exports= {mailsend}