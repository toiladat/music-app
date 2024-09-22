import { Request,Response } from "express"
import Song from "../../models/songs.model"
import Singer from "../../models/singer.model"
import Topic from "../../models/topics.models"
import { systemConfig } from "../../config/system"
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
  const newSong=new Song(req.body)
  await newSong.save();
  res.redirect(`/${prefixAdmin}/songs`)
}