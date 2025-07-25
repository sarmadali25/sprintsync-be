import { Router} from "express";
import health from "./health";
import auth from "./auth";

const router = Router();

// routes
router.use("/api/v1/", health);
router.use("/api/v1/", auth);

export default router;
