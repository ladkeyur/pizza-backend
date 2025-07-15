const nodemailer = require('nodemailer')
const {email,password} = require('./config')

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:email,
        pass:password,
    },
    tls:{
        rejectUnauthorized:false
    }
})

const sendmail = async(to,subject,text,html) =>{
    const mailbox = {
        from:email,
        to:to,
        subject:subject,
        text:text,
        html:html
    }
    try{
        const mailinfo = await transporter.sendMail(mailbox);
        console.log('emailsent',mailinfo.response);
         return true;
    }
    catch(error){
        console.log(error);
    }
}

module.exports=sendmail