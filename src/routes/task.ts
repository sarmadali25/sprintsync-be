import { Router } from "express";
import { authenticateAdmin, authenticateToken } from "../middleware/auth";
import { validateTask, validateUpdateTask, validateUpdateTaskStatus } from "../middleware/taskValidation";
import { TaskController } from "../controllers/TaskController";

const router = Router();

// User routes
router.get("/", authenticateToken, TaskController.getAllTasks);
router.get("/:id", authenticateToken, TaskController.getTaskById);
router.patch("/:id", authenticateToken, validateUpdateTaskStatus, TaskController.updateTaskStatus);


// Admin routes
router.post("/", authenticateAdmin, validateTask, TaskController.createTask);
router.put("/:id", authenticateAdmin, validateUpdateTask, TaskController.updateTask);
router.delete("/:id", authenticateAdmin, TaskController.deleteTask);
// AI routes
router.post("/description-suggesstion",authenticateAdmin,TaskController.getDescriptionSuggestion);


export default router;
