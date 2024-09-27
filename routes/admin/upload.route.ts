import express from "express"
import multer from 'multer'

import * as uploadCloud from '../../middlewares/admin/uploadCloud.middlewares'
const upload = multer()

const route = express.Router()
import * as controller from "../../controllers/admin/upload.controllers";


route.post('/',
  // input trong form insert có name là file
  upload.single('file'),
  uploadCloud.uploadSingle,
  controller.upload)

export const uploadRoute = route