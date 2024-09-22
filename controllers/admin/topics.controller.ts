import { Request,Response } from "express"
import Topic from "../../models/topics.models"

//[GET]/admin/topics
export const topics=async (req:Request,res:Response)=>{ 
    const topics=await Topic.find({
      deleted:false,
      status:'active'
    }).select('title avatar slug status')
    console.log(topics);
    

    res.render('admin/page/topics/index',{
      pageTitle:"Quản lý chủ đề",
      topics:topics
    })
}