import { Express } from "express"
import{routeTopic} from "./topic.route"
export const routeClient=(app:Express)=>{
  app.use('/topics',routeTopic)
}