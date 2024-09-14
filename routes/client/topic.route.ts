import express,{ Express } from "express";
const route=express.Router();
import * as controller from "../../controllers/client/topic.controller"

route.get('/',controller.index)



export  const routeTopic=route