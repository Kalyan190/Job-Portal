// import express, { response } from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv"
// import connectDb from "./utils/database.js";
// import userRoute from '../backend/routes/user.routes.js'
// import companyRoute from '../backend/routes/company.route.js'
// import jobRoute from '../backend/routes/job.routes.js'
// import applicationRoute from '../backend/routes/application.route.js'

// dotenv.config({})


// const app = express();

// //use middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())
// const corsOptions = {
//    origin: `${process.env.BASE_URL}`,
//    credentials: true
// }
// app.use(cors(corsOptions))


// const PORT = process.env.PORT || 3000;

// app.use("/api/v1/users/", userRoute)
// app.use("/api/v1/company/",companyRoute);
// app.use("/api/v1/job/",jobRoute);
// app.use("/api/v1/application/",applicationRoute);
// // app.use("/api/home",(req,res)=>{
// //       res.json("Hello World")
// // ;})


// app.listen(PORT, () => {
//       connectDb();
//       console.log(`Server running at port ${PORT}`);
// }
// )


import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/database.js";
import userRoute from '../backend/routes/user.routes.js';
import companyRoute from '../backend/routes/company.route.js';
import jobRoute from '../backend/routes/job.routes.js';
import applicationRoute from '../backend/routes/application.route.js';

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
   'http://localhost:5173', // Development
   process.env.BASE_URL // Production
];

const corsOptions = {
   origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/company/", companyRoute);
app.use("/api/v1/job/", jobRoute);
app.use("/api/v1/application/", applicationRoute);

app.listen(PORT, () => {
   connectDb();
   console.log(`Server running at port ${PORT}`);
});

