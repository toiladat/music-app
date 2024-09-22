import { Request, Response, NextFunction } from "express";
import { streamUpload } from "../../helper/streamUpload.helper";

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  //khi dung multer se gan cho req 1 object -> req.file
  if (req['file']) {
    const uploadToCloudinary = async (buffer) => {
      const result = await streamUpload(buffer);

      // avatar la file gui len -> req['file].fieldname
      const fileNameUpLoad = req['file'].fieldname
      req.body[fileNameUpLoad] = result['url']
      next();
    }
    uploadToCloudinary(req['file'].buffer);

  }
  else {
    next()
  }
}
export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //lay ra key ( avatar,audio)
    // req[files] => {
    //   avatar:[
    //     {

    //     },{

    //     }
    //   ],
    //   audio:[
    //     {

    //     },{

    //     }
    //   ]
    // }

    // lap qua cac key dung forin
    for (const key in req['files']) {
      // req.body.avatar va req.body.audio tat ca deu la []
      req.body[key] = []

      // push url cua file anh va amthanh vao avatar, audio
      const array = req['files'][key];
      // array: cac file -> bai toan la cho up nhieu file anh va amthanh
      for (const item of array) {
        //sau khi upload to cloud se tra ve ket qua
        //stream_upload +1 params
        const result = await streamUpload(item.buffer);
        const url = result['url']
        req.body[key].push(url)
      }
    }
    next()
  }
  catch (err) {
    console.log(err);
  }
}