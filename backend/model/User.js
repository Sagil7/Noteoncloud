const mongoose = require('mongoose');

const { Schema } = mongoose;

const Userschema = new Schema({
 name:{
    type:String,
    require:true
 },
 email:{
    type:String,
    require:true,
    unique:true
 },
 password:{
  type:String,
  require:true
 }
});
const User=mongoose.model('user',Userschema);
module.exports=User;