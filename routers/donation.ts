import { Request, Response, Router, NextFunction } from "express";
import { prisma } from "..";
const express = require("express");

export const donations = express();
donations.use(express.json());

donations.post(
  "/donations",
  async (
    req: { body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: any }): void; new (): any };
      };
    }
  ) => {
    const donation = await prisma.donation.create({
      data: req.body,
    });
    res.status(201).json(donation);
  }
);

donations.get(
  "/donations",
  async (
    req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: any }): void; new (): any };
      };
    }
  ) => {
    const donations = await prisma.donation.findMany({
      include: { donor: true, recipient: true },
    });
    res.status(200).json(donations);
  }
);

donations.get(
  "/donations/:id",
  async (
    req: { params: { id: string } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { message?: string; error?: any }): void; new (): any };
      };
    }
  ) => {
    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { donor: true, recipient: true },
    });
    donation
      ? res.status(200).json(donation)
      : res.status(404).json({ message: "Donation not found" });
  }
);

donations.put(
  "/donations/:id",
  async (
    req: { params: { id: string }; body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): void; new (): any };
      };
    }
  ) => {
    const updatedDonation = await prisma.donation.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedDonation);
  }
);

donations.delete(
  "/donations/:id",
  async (
    req: { params: { id: string } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: { (): void; new (): any };
        json: { (arg0: { error: string }): void; new (): any };
      };
    }
  ) => {
    await prisma.donation.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  }
);
