import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDb from "./utils/database.js";
import userRoute from '../backend/routes/user.routes.js'
import companyRoute from '../backend/routes/company.route.js'
import jobRoute from '../backend/routes/job.routes.js'
import applicationRoute from '../backend/routes/application.route.js'

dotenv.config({})


const app = express();

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
const corsOptions = {
      origin: 'http/localhost:5173',
      credentials: true
}

app.use(cors(corsOptions))


const PORT = process.env.PORT || 3000;

app.use("/api/v1/users/", userRoute)
app.use("/api/v1/company/",companyRoute);
app.use("/api/v1/job/",jobRoute);
app.use("/api/v1/application/",applicationRoute);


app.listen(PORT, () => {
      connectDb();
      console.log(`Server running at port ${PORT}`);
}
)
