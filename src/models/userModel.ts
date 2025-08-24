import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "This field is required"]
    },
    email : {
        type : String,
        required : [true, "This field is required"],
        unique : [true, "This email already exist!"]
    },
    password : {
        type : String,
        required : [true, "This field is required"]
    },
})

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;