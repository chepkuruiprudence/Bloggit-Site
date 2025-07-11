import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@Prisma/client";

const client = new PrismaClient();

async function checkUniquenessOfUsernameEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userName, email } = req.body;
  const emailUsed = await client.user.findFirst({ where: { email } });
  if (emailUsed) {
    res.status(400).json({ message: "email exists" });
    return;
  }

  const userNameUsed = await client.user.findFirst({ where: { userName } });
  if (userNameUsed) {
    res.status(400).json({ message: "username taken" });
    return;
  }
  next();
}

export default checkUniquenessOfUsernameEmail;
