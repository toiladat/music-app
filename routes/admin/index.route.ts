import { Express } from "express"
import { dashboradRoute } from "./dashboard.route"
import { systemConfig } from "../../config/system"
systemConfig
export const routeAdmin=(app:Express)=>{
  const PATH=`/${systemConfig.prefixAdmin}`;
  app.use(`${PATH}/dashboard`,dashboradRoute)
}