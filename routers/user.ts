
import { fetchUsers } from "../controller/user/createUser";
import { createUser } from "../controller/user/createUser";
import {Request, Response, Router,NextFunction } from "express";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
export const user = Router();

user.get("/", fetchUsers);
user.post("/", createUser);
    