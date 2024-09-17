import express,{ Express } from "express";
import * as controller from "../../controllers/client/song.controller"
const route=express.Router()

route.get("/:slugTopic",controller.index)

export const songRoute=route