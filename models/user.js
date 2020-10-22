const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Definisem User schemu
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    register_date:{
        type:Date,
        default: Date.now()
    }
})


module.exports= User = mongoose.model("User", UserSchema)