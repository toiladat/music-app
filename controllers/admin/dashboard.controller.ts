import { Request,Response } from "express-serve-static-core"
export const dashboard =(req:Request,res:Response)=>{
  res.render('admin/page/dashboard/index',{
    pageTitle:"Trang chủ"
  })
}
