import express from "express"
import multer from 'multer'
import * as controller from "../../controllers/admin/songs.controller"
import * as uploadToCloud from '../../middlewares/admin/uploadCloud.middlewares'
const route = express.Router()
const upload = multer()

route.get('/', controller.index)
route.get('/create', controller.create)
route.post('/create',
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1
    },
    {
      name: 'audio',
      maxCount: 1
    }
  ]),
  uploadToCloud.uploadFields,
  controller.createPost)
export const songsRoute = route