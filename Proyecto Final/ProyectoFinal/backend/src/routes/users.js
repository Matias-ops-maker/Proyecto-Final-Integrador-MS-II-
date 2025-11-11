import express from "express";
import { 
    listUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser,
    resetUserPassword 
} from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.get("/", verifyToken, verifyAdmin, listUsers);
router.post("/", verifyToken, verifyAdmin, createUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.put("/:id/reset-password", verifyToken, verifyAdmin, resetUserPassword);

export default router;

