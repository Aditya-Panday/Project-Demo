const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();        //router function hai
const jwt = require("jsonwebtoken")
const Jwt_secret = "sysx$msak#@13sjbaj"
const bcrypt = require('bcrypt');
const USER = mongoose.model("USER");
const requireLogin = require("../middlewares/requirelogin");




// signup

router.post("/signup", async (req, res) => {
    const { userName, email, password } = req.body;

    if (!email || !userName || !password) {    //field's blank hai toh error dega..
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const existingEmailUser = await USER.findOne({ email: email }); // email find krega 
        const existingUsernameUser = await USER.findOne({ userName: userName });    //username find krega 

        if (existingEmailUser && existingUsernameUser) {
            return res.status(422).json({ error: "User with this email and username already exists" });
        } else if (existingEmailUser) {
            return res.status(422).json({ error: "User with this email already exists" });
        } else if (existingUsernameUser) {
            return res.status(422).json({ error: "User with this username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);     //password hash kr dega
        const user = new USER({
            email,
            userName,
            password: hashedPassword
        });

        await user.save();
        res.json({ message: "Registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
});

// router.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(422).json({ error: "Please add email and password" });
//     }

//     USER.findOne({ email: email }).then((savedUser) => {
//         if (!savedUser) {
//             return res.status(422).json({ error: "Invalid email" });
//         }

//         bcrypt.compare(password, savedUser.password).then((match) => {
//             if (match) {
//                 const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
//                 const { _id, email, userName, Role } = savedUser;

//                 if (Role === "Admin") {
//                     // Fetch all users from the database if the role is admin
//                     USER.find({})
//                         .then(users => {
//                             res.json({ token, user: { _id, email, userName, Role }, allUsers: users });
//                         })
//                         .catch(err => console.error("Error fetching users:", err));
//                 } else {
//                     // Return only the data of the logged-in user if the role is user
//                     res.json({ token, user: { _id, email, userName, Role } });
//                 }
//             } else {
//                 return res.status(422).json({ error: "Invalid password" });
//             }
//         }).catch(err => console.error("Error comparing passwords:", err));
//     }).catch(err => console.error("Error finding user:", err));
// });

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" });
    }

    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" });
        }

        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
                const { _id, email, userName, Role } = savedUser; // Include Role here

                res.json({ token, user: { _id, email, userName, Role } }); // Include Role in response

                console.log({ token, user: { _id, email, userName, Role } });
            } else {
                return res.status(422).json({ error: "Invalid password" });
            }
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

router.get("/userData", requireLogin, (req, res) => {
    const loggedInUser = req.user;

    if (loggedInUser.Role === "Admin") { // Ensure "Admin" is properly cased
        // If the logged-in user is an admin, fetch all users' data
        USER.find({})
            .then(users => {
                res.json({ allUsers: users });
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                res.status(500).json({ error: "Server Error" });
            });
    } else {
        // If the logged-in user is not an admin, return unauthorized
        res.status(403).json({ error: "You are not authorized to access this resource" });
    }
});


module.exports = router;