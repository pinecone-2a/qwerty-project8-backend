import { prisma } from "..";
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());

app.post(
  "/donations",
  async (req: { body: any }, res: { json: (arg0: any) => void }) => {
    const donation = await prisma.donation.create({ data: req.body });
    res.json(donation);
  }
);

app.get("/donations", async (req: any, res: { json: (arg0: any) => void }) => {
  const donations = await prisma.donation.findMany();
  res.json(donations);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
