import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { user } from "./routers/user";
import { bankcard } from "./routers/bankcard";
import { profile } from "./routers/profile";
const { PrismaClient } = require("@prisma/client");

export const prisma = new PrismaClient();

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());


app.use("/auth/",user);
app.use("/bankcard", bankcard);
app.use("/profile", profile);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
