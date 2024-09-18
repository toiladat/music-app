import User from "../models/user.models"
import { Request,Response,NextFunction } from "express"
export const userInfor = async (req:Request, res:Response, next:NextFunction) => {
  const tokenUser = req.cookies.token
  const user = await User.findOne({
    token: tokenUser,
    deleted: false
  })
  if (user) {
    res.locals.user = user
  }
  next()
}

export const requireAuth = async (req:Request, res:Response, next:NextFunction) => {
  const tokenUser = req.cookies.token  
  
  if(!tokenUser){    
    res.json({
      code:401
    })
    return
  }
  const user = await User.findOne({
    token: tokenUser,
    deleted: false
  })  
  
  if(!user){
    res.json({
      code:401
    })
    return
  }
  res.locals.user = user
  
  next()
}