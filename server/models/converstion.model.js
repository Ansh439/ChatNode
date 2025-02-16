import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text : {
        type : String,
        default : ""
    },
    imageURL : {
        type : String,
        default : ""
    },
    videoURL : {
        type : String,
        default : ""
    },
    seen : {
        type : Boolean,
        default : false
    }
},{
    timestamps: true
})

const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Message'
        }
    ]
}, {
    timestamps: true
})

const conversationModel = mongoose.model('Conversation', conversationSchema)
const messageModel = mongoose.model('Message', messageSchema)
export default {conversationModel, messageModel};