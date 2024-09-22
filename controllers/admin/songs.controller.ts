import { Request,Response } from "express"
import Song from "../../models/songs.model"
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