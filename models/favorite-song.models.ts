import mongoose from "mongoose";
const favoriteSongSchema=new mongoose.Schema({
  userId:String,
  songList:{
    type:Array,
    default:[]
  }
},{
  timestamps:true
})
const FavoriteSong=mongoose.model('FavoriteSong',favoriteSongSchema,'favorite-songs')
export default FavoriteSong