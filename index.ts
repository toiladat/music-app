import express, { Express,Request,Response } from "express";
import {connectDatabase} from "./config/database"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { routeClient } from "./routes/client/index.route";
dotenv.config()
const app:Express=express();
const port:string|number=process.env.PORT;

connectDatabase();


// lib giúp show thông báo bằng express application
import flash from "express-flash"
import cookieParser from "cookie-parser"
import session from "express-session"


//flash
// dung de luu 1 flash vao cookie tren web
app.use(cookieParser('fffs'))
//set thoi gian sonng cho flash
// khi reload se mat session nay != session hoc ben fe
app.use(session({
  cookie: {
    maxAge: 50000
  }
}))
app.use(flash())
//end flash

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('views','./views');
app.set('view engine','pug')

routeClient(app);

app.listen(port,()=>{
  console.log(`App listening on port ${port}`);
  
})