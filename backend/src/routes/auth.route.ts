import { Router } from "express";

import verifyRegistrationInfo from "../middlewares/verifyuserinfo";
import verifyPasswordStrength from "../middlewares/verifypasswordstrength";
import checkUniquenessOfUsernameEmail from "../middlewares/checkinfouniqueness";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router: Router = Router();

router.post(
  "/register",
  verifyRegistrationInfo,
  checkUniquenessOfUsernameEmail,
  verifyPasswordStrength,
  registerUser,
);

router.post("/login", loginUser);

export default router;
