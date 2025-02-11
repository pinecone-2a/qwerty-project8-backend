import { Request, Response, Router } from "express";
import { prisma } from "..";

export const bankcard = Router();

// POST route to create a bank card
bankcard.post("/", async (req: Request, res: Response) => {
  const create = await prisma.bankCard.create({
    data: req.body,
  });
  res.json(create);
});

// PUT route to update a bank card
bankcard.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const currentCard = await prisma.bankCard.findUnique({
    where: { id: id },
  });

  if (!currentCard) {
    res.status(404).json({ message: "Bank card not found" });
  }

  const update = await prisma.bankCard.update({
    where: { id: id },
    data: req.body,
  });

  res.json({ message: "Bank card update is successful", update });
});

bankcard.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const currentCard = await prisma.bankCard.findUnique({
    where: { id: id },
  });

  if (!currentCard) {
    res.status(404).json({ message: "Bank card not found" });
  }

  const deleteBankcard = await prisma.bankCard.delete({
    where: { id: id },
  });

  res.json({ message: "Bank card has been removed", deleteBankcard });
});

bankcard.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const read = await prisma.bankCard.findMany({
    where: {
      id: id,
    },
  });
  res.json(read);
});

bankcard.get("/", async (req: Request, res: Response) => {
  const read = await prisma.bankCard.findMany({});
  res.json(read);
});
