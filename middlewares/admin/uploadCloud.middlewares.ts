import {Request,Response, NextFunction } from "express";
import { streamUpload } from "../../helper/streamUpload.helper";

export const uploadSingle=(req:Request,res:Response,next:NextFunction)=>{
  //khi dung multer se gan cho req 1 object -> req.file
  if(req['file']){
    const uploadToCloudinary=async (buffer)=>{
      const result =await streamUpload(buffer);
      
      // avatar la file gui len -> req['file].fieldname
      const fileNameUpLoad=req['file'].fieldname
      req.body[fileNameUpLoad]=result['url']
      next();
    }
    uploadToCloudinary(req['file'].buffer);

  }
  else{
    next()
  }
}