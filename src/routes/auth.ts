import { Router, Request, Response } from "express";
import { validateLogin, validateRegister } from "../middleware/authValidation";

const router = Router();

router.post(
  "/login",
  validateLogin,
  (req: Request, res: Response): Response => {
    const { email, password } = req.body;

    if (email !== "test@test.com" || password !== "test") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({ message: "Login successful" });
  }
);

router.post(
  "/signup",
  validateRegister,
  (req: Request, res: Response): Response => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    return res.json({
      message: "Registration successful",
      body: { firstName, lastName, email, password, phoneNumber },
    });
  }
);

export default router;
