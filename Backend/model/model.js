const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        default: "user" // Setting default value to "user"
    }
});

mongoose.model("USER", userSchema);
