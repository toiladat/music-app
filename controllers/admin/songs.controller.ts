import { flash } from 'express-flash';
import { Request,Response } from "express"
import Song from "../../models/songs.model"
import Singer from "../../models/singer.model"
import Topic from "../../models/topics.models"
import { systemConfig } from "../../config/system"
import moment from "moment"
const prefixAdmin=systemConfig.prefixAdmin
//[GET]/admin/songs
export const index=async (req:Request,res:Response)=>{
  const songs=await Song.find({
    deleted:false,
    status:'active'
  })
  res.render('admin/page/songs/index.pug',{
    pageTitle:"Danh sách bài hát",
    songs:songs
  })
}
//[GET]/admin/songs/create
export const create=async(req:Request,res:Response)=>{

  const singers=await Singer.find({
    deleted:false,
    status:'active'
  }).select('fullName')

  const topics=await Topic.find({
    deleted:false,
    status:'active'
  }).select('title')

  res.render('admin/page/songs/create',{
    pageTitle:'Tạo mới bài hát',
    singers:singers,
    topics:topics
  })
}

//[POST]/admin/songs/create
export const createPost =async(req:Request,res:Response)=>{
  //body.avatar[]=>string ???
  if(req.body['avatar']){
    req.body['avatar']=req.body['avatar'][0]
  }
  if(req.body['audio']){
    req.body['audio']=req.body['audio'][0]
  }
  
  const newSong=new Song(req.body)
  await newSong.save();
  res.redirect(`/${prefixAdmin}/songs`)
}

//[GET]/admin/songs/edit/:id
export const edit = async(req:Request,res:Response)=>{
try{
  const id=req.params.id;
  const song= await Song.findOne({
    _id:id,
    deleted:false,
    status:'active'
  })

  const singers=await Singer.find({
    status:'active',
    deleted:false
  }).select('fullName')

  const topics=await Topic.find({
    deleted:false,
    status:'active'
  }).select('title')


  // console.log(singers);
  

  res.render('admin/page/songs/edit.pug',{
    pageTitle:"Chỉnh sửa bài hát",
    song:song,
    singers:singers,
    topics:topics
  })
}
catch{
  // req.flash('error','Có lỗi xảy ra')
  res.redirect('back');
}
}
//[PATCH]/admin/songs/edit/:id
export const editPatch =async(req:Request,res:Response)=>{
try{
  const id=req.params.id;

  if(req.body.avatar){
    req.body.avatar=req.body.avatar[0];
  }
  if(req.body.audio){
    req.body.audio=req.body.audio[0];
  }
  await Song.updateOne({
    _id:id,
    deleted:false,
    status:'active'
  },req.body)

  res.redirect('back');
  
}
catch{
  res.redirect('back'); 
}
}