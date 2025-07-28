import { Router} from "express";
import health from "./health";
import auth from "./auth";
import task from "./task";

const router = Router();

// routes
router.use("/api/v1/", health);
router.use("/api/v1/auth", auth);
router.use("/api/v1/task", task);

export default router;
