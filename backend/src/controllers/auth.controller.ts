import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

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
        avatar: avatarInitials,
      },
    });
        res.status(201).json({ message: "registered successfully." });
  } catch (e) {
    console.error("ERROR: ", e);
    res.status(500).json({ message: "An error occured" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userHandle, password } = req.body;

    if (!userHandle || !password) {
      return res.status(400).json({ message: "Both userHandle and password are required." });
    }

    const user = await client.user.findFirst({
      where: {
        OR: [{ userName: userHandle }, { email: userHandle }],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    const { password: userPassword, avatar, updatedAt, ...userDetails } = user;

    const payload = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "2h",
    });

    res.status(200).json({ message: "logged in successfully.", token, user: userDetails });
  } catch (e) {
    console.error("Login error: ", (e as Error).message);
    res.status(500).json({ message: "An error occurred", error: (e as Error).message });
  }
};
