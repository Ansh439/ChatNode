import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'provide name']
    },
    email : {
        type : String,
        required : [true, 'provide email'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'provide password']
    },
    profile_pic : {
        type : String, 
        default : ""
    }

}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);
export default userModel;