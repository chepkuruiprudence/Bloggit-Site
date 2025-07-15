import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await client.user.findUnique({
      where: { id: (req as any).user.id },
      select: {
        firstName: true,
        secondName: true,
        email: true,
        userName: true,
        avatar: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, secondName, email, userName } = req.body;
    const userId = (req as any).user.id;

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { firstName, secondName, email, userName },
    });

    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = (req as any).user;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const existingUser = await client.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      existingUser.password,
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await client.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ message: "Failed to update password" });
  }
};

export const getUserBlogs = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const blogs = await client.blog.findMany({
      where: { authorId: user.id, isDeleted: false },

      include: {
        author: {
          select: {
            firstName: true,
            secondName: true,
            id: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(blogs);
  } catch (err) {
    console.error("Fetch user blogs error:", err);
    res.status(500).json({ message: "Failed to fetch user's blogs" });
  }
};
