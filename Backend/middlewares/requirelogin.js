const jwt = require("jsonwebtoken")
const Jwt_secret = "sysx$msak#@13sjbaj"
const mongoose = require("mongoose")    //mongoose isliye use kiya hai ki user ki id get krne ke liye..
const USER = mongoose.model("USER")

module.exports = (req, res, next) => {
    const { authorization } = req.headers;  //jo req.header dete hai like application-json wo authorization mai use kiya hai
    if (!authorization) {   //agar header's nhi hai toh pehle kahega ki login kro
        console.log("Authorization header missing");
        return res.status(401).json({ error: "You must have logged in 1" })
    }
    const token = authorization.replace("Bearer ", "")  //Bearer ko khali string se modify kr diya token mai save kr diya
    jwt.verify(token, Jwt_secret, (err, payload) => {   //aab jwt verify krega token ko
        if (err) {
            console.log("Token verification failed:", err);
            return res.status(401).json({ error: "You must have logged in 2" })
        }
        const { _id } = payload //iske andar user ki id hogi
        USER.findById(_id).then(userData => {   //isme check krenge is id se kon sa user hai uska data de denge..
            req.user = userData
            next()
        })
    })

}