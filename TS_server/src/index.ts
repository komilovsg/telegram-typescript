import { Request, Response } from "express";
import userRouter from "./routes/UserRoutes";
import messageRoutes from "./routes/MessageRoutes";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const db = require("./db");
app.use(bodyParser.json());
app.use(cors());
app.use(userRouter)
app.use(messageRoutes)

app.listen(3001, () => {
  console.log(`Hola KSG, everythings work well`);
});
