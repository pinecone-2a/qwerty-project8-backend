import { Request, Response, Router } from "express";
import { prisma } from "..";

export const profile = Router();

profile.post("/", async (req: Request, res: Response) => {
  req.body.userId = Number(req.body.userId);
  const create = await prisma.profile.create({
    data: req.body,
  });
  res.json(create);
});

profile.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const currentCard = await prisma.profile.findUnique({
    where: { id: Number(id) },
  });

  if (!currentCard) {
    res.status(404).json({ message: "Profile is not found" });
  }

  const update = await prisma.profile.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json({ message: "Profile update is successful", update });
});

profile.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const currentCard = await prisma.profile.findUnique({
    where: { id: Number(id) },
  });

  if (!currentCard) {
    res.status(404).json({ message: "Profile is not found" });
  }

  const deleteprofile = await prisma.profile.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Profile is has been removed", deleteprofile });
});

profile.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const read = await prisma.profile.findMany({
    where: {
      id: Number(id),
    },
  });
  res.json(read);
});

profile.get("/", async (req: Request, res: Response) => {
  const read = await prisma.profile.findMany({});
  res.json(read);
});
