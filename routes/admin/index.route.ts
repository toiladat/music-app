import { Express } from "express"
import { dashboradRoute } from "./dashboard.route"
import {songsRoute} from "./songs.route"
import {uploadRoute} from './upload.route'

import { systemConfig } from "../../config/system"
import { topicRoute } from "./topcis.route"
systemConfig
export const routeAdmin=(app:Express)=>{
  const PATH=`/${systemConfig.prefixAdmin}`;

  app.use(`${PATH}/dashboard`,dashboradRoute)
  app.use( `${PATH}/topics`,topicRoute)
  app.use(`${PATH}/songs`,songsRoute)
  app.use(`${PATH}/upload`,uploadRoute)
}