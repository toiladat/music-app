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
import { routeAdmin } from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";


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


//tinymce
app.use('/tinymce',express.static(path.join(__dirname,'node_modules','tinymce')))
//end tinymce

// nhung lib method_override
// de ghi de phuong thuc trong form
// mac dinh form la get, sau do la post
import methodOverride from 'method-override'
app.use(methodOverride('_method'))




app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
// khi deploy len onl thi phai dung_dir ow view
//__dirname luôn trả về đường dẫn tuyệt đối.
app.set('views',`${__dirname}/views`);
app.set('view engine','pug')
// pug dung prefixAdmin
app.locals.prefixAdmin=systemConfig.prefixAdmin;

routeClient(app);
routeAdmin(app)
app.listen(port,()=>{
  console.log(`App listening on port ${port}`);
  
})