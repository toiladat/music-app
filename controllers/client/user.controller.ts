import  md5 from 'md5';
import {generateRandomString} from "../../helper/generate.helper"
import { Request,Response } from "express"
import User from "../../models/user.models"
import FavoriteSong from '../../models/favorite-song.models';

//[GET]/user/login
export const login=(req:Request,res:Response)=>{
  res.render('client/page/user/login.pug',{
    pageTitle:"Đăng nhập"
  })
}
//[POST]/user/login
export const loginPost=async(req,res:Response)=>{
  //bug làm tính năng ktr email là duy nhất
  const {
    email,
    password
  } = req.body
  const account = await User.findOne({
    email: email
  })
  if (!account) {
    req.flash("error", "email không tồn tại !")
    res.redirect('back')
    return
  }
  const passType=md5(password)
  if (passType != account.password) {
    req.flash("error", "Mật khẩu không chính xác")
    res.redirect('back')
    return
  }
  if (account.status == 'inactive') {
    req.flash("error", "Tài khoản đang bị khóa")
    res.redirect('back')
    return
  }
  //set token cho account 
  // khi login sẽ ktra token từ bên fe xem có hợp lệ không
  //logout làm bên fe, khi click xóa token đi và redirect đến form login
  
  res.cookie('token', account.token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })

  res.redirect('/topics')
}
//[GET]/user/register
export const register=(req:Request,res:Response)=>{
  res.render('client/page/user/register.pug',{
    pageTitle:'Đăng ký'
  })
}
//[POST]/user/register
export const registerPost=async (req,res:Response)=>{
  const {email,password}=req.body
  //ktra co emal chua
  const existUser=await User.findOne({
    email:email
  })

  if(existUser){
    req.flash('error',"Email đã tồn tại")
    res.redirect('back')
    return
  }
  req.body.password=md5(req.body.password)
  req.body.token=generateRandomString(32)

  const newUser=new User(req.body)
  await newUser.save()
  res.cookie('token', newUser.token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
  //tao models favorite
  const newFavorite= new FavoriteSong({
    userId:newUser._id
  })
  await newFavorite.save()
  res.redirect('/topics')
}

export const logout= (req:Request,res:Response)=>{
  res.clearCookie('token')
  res.redirect('/topics')
}