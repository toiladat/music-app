import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  fullName:String,
  email:String,
  password:String,
  token:String,
  status:String,
  likedSongList:{
    type:Array,
    default:[]
  },
  deleted:{
    type:Boolean,
    default:false
  }
},{
  timestamps:true
})
const User=mongoose.model('User',userSchema,'users')
export default User