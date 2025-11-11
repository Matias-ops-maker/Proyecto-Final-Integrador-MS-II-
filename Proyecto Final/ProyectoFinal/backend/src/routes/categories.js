import express from "express";
import { 
    listCategories, 
    getCategory, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from "../controllers/categoryController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", listCategories);
router.get("/:id", getCategory);
router.post("/", verifyToken, verifyAdmin, createCategory);
router.put("/:id", verifyToken, verifyAdmin, updateCategory);
router.delete("/:id", verifyToken, verifyAdmin, deleteCategory);

export default router;

