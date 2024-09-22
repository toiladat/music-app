// cloudinary=require('cloudinary).v2
// import version 2 cua cloudinary
import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})

export const streamUpload=(buffer)=>{
  return new Promise((resolve,reject)=>{
    //upload_stream co 2 param
    //1. cac file duoc upload
    //2. ham callback xu ly 
    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type:'auto'
      },
      (error,result)=>{
        if(result)
          resolve(result)
        else
          reject(error)
      }
    )
    streamifier.createReadStream(buffer).pipe(stream)
  })
}