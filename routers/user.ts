
import {Request, Response, Router,NextFunction } from "express";
import { prisma } from "../";
const findOne=async (req:Request,res:Response)=>{
    const oneUser=await prisma.user.findOne()

    res.json(oneUser)
}
const createUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          email:email,
          password: password,
          username: username,
        },
      });
      res.json(newUser);
    } catch (e) {
      res.send(e);
      console.log(e);
    }
  };
const fetchUsers = async (req: Request, res: Response) => {
const users = await prisma.user.findMany({});
res.json(users);
};


export const user = Router();

user.get("/auth", fetchUsers);
user.get("/auth:id",findOne)
// user.patch("/auth")
user.post("/auth", createUser);
// user.post("/", createUser);

