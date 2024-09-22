import { Express } from "express"
import{routeTopic} from "./topic.route"
import { songRoute } from "./song.route"
import {userRoute} from './user.route'
import { userInfor } from "../../middlewares/client/auth.middlewares"
export const routeClient=(app:Express)=>{
  app.use('/user',userRoute)
  app.use('/topics',userInfor,routeTopic)
  app.use('/songs',userInfor,songRoute)
}