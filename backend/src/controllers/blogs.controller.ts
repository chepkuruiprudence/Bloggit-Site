import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await client.blog.findMany({
      where: { isDeleted: false },
      include: {
        author: {
          select: {
            firstName: true,
            secondName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Fetch blogs error:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content, image } = req.body;
    const { id, avatar } = (req as any).user;

    if (!title || !synopsis || !content || !image) {
      return res.status(400).json({ message: "Missing required blog fields" });
    }

    const blog = await client.blog.create({
      data: {
        title,
        synopsis,
        content,
        image,
        authorId: id,
        avatar,
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("🔥 ERROR creating blog:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    const blog = await client.blog.findUnique({
      where: { id: blogId },
      include: {
        author: {
          select: {
            firstName: true,
            secondName: true,
            avatar: true,
          },
        },
      },
    });

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { title, synopsis, content, imageUrl } = req.body;
    const user = (req as any).user;

    const blog = await client.blog.findUnique({ where: { id: blogId } });
    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.authorId !== user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedBlog = await client.blog.update({
      where: { id: blogId },
      data: { title, synopsis, content, image: imageUrl },
    });

    res.status(200).json(updatedBlog);
  } catch (e) {
    console.error("Update blog error:", e);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const user = (req as any).user;

    const blog = await client.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.authorId !== user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await client.blog.update({
      where: { id: blogId },
      data: { isDeleted: true },
    });

    res.status(204).send();
  } catch (e) {
    console.error(" ERROR during deleteBlog operation:", e);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

export const getUserBlogs = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const blogs = await client.blog.findMany({
      where: { authorId: user.id, isDeleted: false },
      include: { author: true },
    });

    res.status(200).json(blogs);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch user blogs" });
  }
};
