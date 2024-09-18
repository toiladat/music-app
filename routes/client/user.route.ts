import express,{ Express } from "express";
import * as controller from '../../controllers/client/user.controller'
const route=express.Router()
route.get('/login',controller.login)
route.post('/login',controller.loginPost)
route.get('/register',controller.register)
route.post('/register',controller.registerPost)
route.get('/logout',controller.logout)
export const userRoute=route