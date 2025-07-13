import { Request, Response, NextFunction } from "express";
import zxcvbn from "zxcvbn";

function verifyPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password } = req.body;
  const passwordStrength = zxcvbn(password);

  if (passwordStrength.score < 3) {
    res.status(400).json({ message: "Your password is weak" });
    return;
  }
  next();
}

export default verifyPasswordStrength;
