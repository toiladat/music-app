import express,{ Express } from "express";
import * as controller from "../../controllers/client/song.controller"
import {userInfor,requireAuth} from "../../middlewares/auth.middlewares"
const route=express.Router()


route.get("/topic/:slugTopic",controller.index)
route.get('/detail/:slugSong',controller.detail)

route.patch('/like',
  requireAuth,
  controller.like)

route.patch('/favorite',
  requireAuth,
  controller.favorite)
export const songRoute=route