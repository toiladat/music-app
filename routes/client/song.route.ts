import express,{ Express } from "express";
import * as controller from "../../controllers/client/song.controller"
const route=express.Router()

route.get("/:slugTopic",controller.index)
route.get('/detail/:slugSong',controller.detail)
route.patch('/like',controller.like)
export const songRoute=route