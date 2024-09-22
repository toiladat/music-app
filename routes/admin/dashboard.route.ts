import express from "express"
const route=express.Router()
import * as controller from "../../controllers/admin/dashboard.controller";
route.get('/',controller.dashboard)
export const dashboradRoute=route