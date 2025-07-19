import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


const app = express();
dotenv.config();


const port = process.env.PORT || 3000;
const data_uri = process.env.MONGO_URI;

try {
    await mongoose.connect(data_uri);
    console.log("Database Connected");
} catch (error) {
    console.log(error);
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
