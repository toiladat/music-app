import express from "express"
import * as controller from "../../controllers/admin/topics.controller"
const route=express.Router()
route.get('/',controller.topics)
export  const  topicRoute=route;