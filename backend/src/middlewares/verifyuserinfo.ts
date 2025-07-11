import express, { Request, Response, NextFunction } from "express";

function verifyRegistrationInfo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { firstName, secondName, userName, password, email } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "Enter your firstname" });
    return;
  }

  if (!secondName) {
    res.status(400).json({ message: "Enter your secondname" });
    return;
  }

  if (!userName) {
    res.status(400).json({ message: "Enter your username" });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "Enter your password" });
    return;
  }

  if (!email) {
    res.status(400).json({ message: "Enter your email" });
    return;
  }

  if (!firstName) {
    res.status(400).json({ message: "Enter your firstname" });
    return;
  }
  next();
}

export default verifyRegistrationInfo;
