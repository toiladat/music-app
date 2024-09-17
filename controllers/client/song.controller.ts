import { Request,Response } from "express"
import Topic from "../../models/topics.models"
import Song from "../../models/songs.model"
import Singer from "../../models/singer.model"
//[GET]/songs/:slugTopic
export const index =async(req:Request,res:Response)=>{
 try{
  const slug=req.params.slugTopic
  // lay ra id topic
  const topic=await Topic.findOne({
    slug:slug,
    deleted:false,
    status:'active'
  })
  const idTopic=topic["_id"]  
  // lay songList theo id
  const songs=await Song.find({
    topicId:idTopic,
    deleted:false,
    status:'active'
  })

  //Them thong tin singer cho moi bai hat
  for (const song of songs){
    const singerData=await Singer.findOne({
      _id:song.singerId,
      status:'active',
      deleted:false
    }).select('fullName')
    song["singerFullName"]=singerData.fullName
  }

  res.render("client/page/songs/list",{
    pageTitle:"Danh sách bài hát",
    songs:songs
  })
 }
 catch{
  res.send('Not Found')
 }
}
//[GET]/songs/detail/:slugSong
export const detail=async(req:Request,res:Response)=>{
try{
  const slugSong=req.params.slugSong
  // lấy thông tin song  
const song=await Song.findOne({
  slug:slugSong,
  status:'active',
  deleted:false
})

  // lấy thông tin singer 
const singer=await Singer.findOne({
  _id:song.singerId,
  status:"active",
  deleted:false
}).select("fullName")

  // lấy thông tin topic
const topic=await Topic.findOne({
  _id:song.topicId,
  deleted:false,
  status:'active'
}).select('title')

res.render('client/page/songs/detail.pug',{
  pageTitle:"Chi tiết bài hát",
  song:song,
  topic:topic,
  singer:singer
})
}
catch{
  res.send("Có lỗi xảy ra")
}
}