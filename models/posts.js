const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
    
    score:{
        type:Number
    },
    viewCount:{
        type:Number
    },
    body:{
        type:String,
        isRequired:true
    },
    ownerUserid:{
        type:Schema.Types.ObjectId,ref:"User"
    },
    comments:[{
      type: Schema.Types.ObjectId , ref:"Comment"  
    }],
    editorUser:{type: Schema.Types.ObjectId, ref:"User"},
    date:{
        type:Date,
        default:Date.now()
    }

})

module.exports= Post = mongoose.model("Post", post)