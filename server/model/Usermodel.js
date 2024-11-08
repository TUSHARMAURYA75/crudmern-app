import mongoose from "mongoose"


const userSchema =  new mongoose.Schema({
    Fname: {
        type: String,
        required:true
    },
    Lname: {
        type: String,
        required:true
    },
    Email: {
        type: String,
        required:true
    },
    Password: {
        type: String,
        required:true
    },
})

export default mongoose.model("User", userSchema);