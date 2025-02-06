import {Request, Response, Router,NextFunction } from "express";
import { prisma } from "..";

export const user = Router();

user.get("/",async (req:Request,res:Response)=>{
    res.json({"user":"get"});
});

user.post("/",async (req:Request,res:Response)=>{
    res.json({"user":"post"});
});
