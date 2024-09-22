import express from "express"

import * as controller from "../../controllers/admin/songs.controller"
const route= express.Router()
route.get('/', controller.index)
route.get('/create',controller.create)
export const songsRoute=route