import { Express } from "express"
import{routeTopic} from "./topic.route"
import { songRoute } from "./song.route"
export const routeClient=(app:Express)=>{
  app.use('/topics',routeTopic)
  app.use('/songs',songRoute)
}