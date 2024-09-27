import { Request, Response } from "express"
export const upload = async (req: Request, res: Response) => {
  res.json({
    location: req.body.file
  })
}