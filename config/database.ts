import mongoose from "mongoose";

export const connectDatabase= async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Kết nối database thành công");
    
  }
  catch{
    console.log("Kết nối database thất bại");
  }
}