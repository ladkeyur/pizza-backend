require('dotenv').config();


module.exports = {
    MONGODB_URL: process.env.MONGODB_URL,
    jwt_secret_key:process.env.jwtsecret,
    email:process.env.EMAIL,
    password:process.env.PASSWORD,
}