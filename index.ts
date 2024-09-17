import express, { Express,Request,Response } from "express";
import {connectDatabase} from "./config/database"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { routeClient } from "./routes/client/index.route";
dotenv.config()
const app:Express=express();
const port:string|number=process.env.PORT;

connectDatabase();


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('views','./views');
app.set('view engine','pug')

routeClient(app);

app.listen(port,()=>{
  console.log(`App listening on port ${port}`);
  
})