import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDb from "./utils/database.js";

dotenv.config({})


const app = express();

//use middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const corsOptions = {
      origin:'http/localhost:5173',
      credentials:true
}

app.use(cors(corsOptions))


const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{
      connectDb();
      console.log(`Server running at port ${PORT}`);
      }
      )
