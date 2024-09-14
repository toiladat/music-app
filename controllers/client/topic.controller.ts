import Topic from "../../models/topics.models";
import { Express,Request,Response } from "express";

//[GET]/topics
export const index =async(req:Request,res:Response)=>{
    const topics=await Topic.find({
      deleted:false
    });
    console.log(topics);
    
    res.render('client/page/topics/index.pug') 
  }