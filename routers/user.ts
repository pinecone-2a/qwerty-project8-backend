import { profile } from "console";
import {Request, Response, Router,NextFunction } from "express";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
export const user = Router();

user.get("/",async (req:Request,res:Response)=>{
    res.json({"user":"get"});
});

user.post("/",async (req:Request,res:Response)=>{
    res.json({"user":"post"});
});
