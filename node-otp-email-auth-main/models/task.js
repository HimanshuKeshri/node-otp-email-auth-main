const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
    task:{
        type:String,
        required:true 
    },
    date:{
        type:Date,
        default:Date.now 
    },
    status:{
        type:Boolean,
        default:false,
    }
})

module.exports=mongoose.model("todotask",todoSchema);