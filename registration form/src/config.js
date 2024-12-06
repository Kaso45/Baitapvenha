const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut")


// check database connected or not
connect.then(() => {
    console.log("database connected")
})
.catch(() => {
    console.log("database cannot connected")
})


// create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


// collection part

const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;

