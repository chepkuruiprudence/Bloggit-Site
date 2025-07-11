import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@Prisma/client";
import jwt from "jsonwebtoken"

const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, secondName, userName, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarInitials = `${firstName[0]} ${secondName[0]}`.toUpperCase();
    await client.user.create({
      data: {
        firstName,
        secondName,
        userName,
        password: hashedPassword,
        email,
        avatarUrl: avatarInitials,
      },
    });
    res.status(201).json({ message: "registered successfully." });
  } catch (e) {
    console.error("🔥 ERROR: ", e);
    res.status(500).json({ message: "An error occured" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
 try {

  const {userHandle, password} = req.body;

  if (!userHandle || !password) {
   return res
     .status(400)
     .json({ message: "Both userHandle and password are required." });
 }

  const user = await client.user.findFirst({
    where: {
      OR: [
        { userName: userHandle },
        { email: userHandle }
      ]
    }
  })

  if (!user) {
   res.status(400).json({message:"Wrong Credentials"})
   return;
  }

  const matchPassword = await bcrypt.compare(password, user.password)

  if (!matchPassword) {
   res.status(400).json({message: "Wrong Cridentials"})
   return
  }

  const { password: userPassword, avatarUrl, updatedAt, ...userDetails } = user;

  const payload = {
   id: user.id,
   userName: user.userName,
   email: user.email,
 };
 
  const token = jwt.sign(userDetails, process.env.JWT_SECRET as string, {expiresIn: "1m" })


   res.status(200).json({ message: "logged in successfully.",
    token,
    user: userDetails
   });
 } catch (e) {
   console.error(" ERROR: ", e);
   res.status(500).json({ message: "An error occured" });
 }
};

