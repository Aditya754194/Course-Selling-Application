import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoute from "./routes/courseRoute.js";
import fileUpload from "express-fileupload";
import {v2 as cloudinary} from 'cloudinary'; 
import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();

//middleware for json data
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir :'/tmp/'
}));

const port = process.env.PORT || 3000;
const data_uri = process.env.MONGO_URI;

try {
    await mongoose.connect(data_uri);
    console.log("Database Connected");
} catch (error) {
    console.log(error);
}

//defining routes 
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);

//cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
