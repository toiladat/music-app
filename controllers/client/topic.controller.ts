import Topic from "../../models/topics.models";
import { Express,Request,Response } from "express";

//[GET]/topics
export const index =async(req:Request,res:Response)=>{
    const topics=await Topic.find({
      deleted:false
    });    
    res.render('client/page/topics/index.pug',{
      pageTitle:"Topics",
      topics:topics
    }) 
  }