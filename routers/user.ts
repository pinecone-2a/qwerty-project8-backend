import {Request, Response, Router,NextFunction } from "express";
import { prisma } from "..";

export const user = Router();

user.get("/",async (req:Request,res:Response)=>{
    const create = await prisma.user.create({
        data: {
            email:'sssss@gmail.com',
            password:'akjsdhf',
            username:'sdsdkfjsdklfj',
        }
    });
    res.json(create);
});

user.post("/",async (req:Request,res:Response)=>{
    res.json({"user":"post"});
});
