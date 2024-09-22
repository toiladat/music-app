import { Express } from "express"
import { dashboradRoute } from "./dashboard.route"

import { systemConfig } from "../../config/system"
import { routeTopic } from "../client/topic.route"
import { topicRoute } from "./topcis.route"
systemConfig
export const routeAdmin=(app:Express)=>{
  const PATH=`/${systemConfig.prefixAdmin}`;

  app.use(`${PATH}/dashboard`,dashboradRoute)
  app.use( `${PATH}/topics`,topicRoute)
}