import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { user } from "./routers/user";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use("/user/",user);


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});