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
    let stream = cloudinary.uploader.upload_stream(
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