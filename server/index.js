import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import quesroutes from "./routes/quesroute.js";
import userroutes from "./routes/userroute.js";

const app = express();
dotenv.config();

import cors from 'cors';
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/ques", quesroutes);
app.use("/users", userroutes);

const PORT = 8000 || process.env.PORT;

const URL = process.env.URL;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening on post ${PORT}.`)))
  .catch((error) => console.log("Error : ", error));
