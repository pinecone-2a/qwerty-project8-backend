import { Request, Response, Router, NextFunction } from "express";
import { prisma } from "..";
import { read } from "fs";

export const user = Router();

<<<<<<< HEAD
user.get("/",async (req:Request,res:Response)=>{
    const create = await prisma.user.create({
        data: {
            email:'sssss@gmail.com',
            password:'akjsdhf',
            username:'sdsdkfjsdklfj',
        }
    });
    res.json(create);
=======
user.get("/", async (req: Request, res: Response) => {
  const read = await prisma.user.findMany();
  res.json(read);
>>>>>>> main
});

user.post("/", async (req: Request, res: Response) => {
  res.json({ user: "post" });
});
