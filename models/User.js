const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const User=mongoose.model('users',UserSchema);
module.exports=User;