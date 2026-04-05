const {Schema,model}=require('mongoose');
const User=new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    emailID:{
        type:String,
        required:true
    }
})
const Users=model('User',User);
module.exports=Users;