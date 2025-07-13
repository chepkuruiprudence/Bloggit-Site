import { Request, Response, NextFunction } from "express";

export const validateblogdetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === "DELETE") return next();
  const { title, synopsis, content, image } = req.body;
  if (!title || !synopsis || !content || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }
  next();
};

export default validateblogdetails;
