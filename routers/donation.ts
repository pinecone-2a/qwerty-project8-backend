import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const donationRouter = Router();

const createDonation = async (req: Request, res: Response) => {
  const {
    amount,
    specialMessage,
    socialURLOrBuyMeACoffee,
    donorId,
    recipientId,
  } = req.body;
  try {
    const newDonation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donorId,
        recipientId,
      },
    });
    res.json(newDonation);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
};

const fetchTotalEarnings = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const donations = await prisma.donation.findMany({
      where: {
        recipientId: Number(id),
      },
    });
    console.log({ id });
    const totalEarnings = donations.reduce((total, donation) => {
      return total + (donation.amount || 0);
    }, 0);

    res.json({
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total donations" });
  }
};

const fetchReceivedDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receivedDonation = await prisma.donation.findMany({
      where: {
        recipientId: Number(id),
      },
    });
    res.json(receivedDonation);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};

donationRouter.get("/total-earnings/:userId", fetchTotalEarnings);
donationRouter.get("/:id", fetchReceivedDonation);
donationRouter.post("/create-donation", createDonation);

export default donationRouter;
