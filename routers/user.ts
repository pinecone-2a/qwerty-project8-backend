import { Request, Response, Router, NextFunction } from "express";
import { prisma } from "..";
import { read } from "fs";

export const user = Router();

user.get("/", async (req: Request, res: Response) => {
  const read = await prisma.user.findMany();
  res.json(read);
});

user.post("/", async (req: Request, res: Response) => {
  res.json({ user: "post" });
});
