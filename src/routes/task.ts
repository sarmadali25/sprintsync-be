import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { validateTask, validateUpdateTask } from "../middleware/taskValidation";
import { TaskController } from "../controllers/TaskController";

const router = Router();

// Public routes
router.get("/", authenticateToken, TaskController.getAllTasks);
router.get("/:id", authenticateToken, TaskController.getTaskById);
router.post("/", authenticateToken, validateTask, TaskController.createTask);
router.patch("/:id", authenticateToken, validateUpdateTask, TaskController.updateTask);
router.delete("/:id", authenticateToken, TaskController.deleteTask);

export default router;
