import express from "express";
import { 
    getCart, 
    addToCart, 
    updateCartItem, 
    removeCartItem,
    clearCart 
} from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", verifyToken, getCart);
router.post("/items", verifyToken, addToCart);
router.put("/items/:id", verifyToken, updateCartItem);
router.delete("/items/:id", verifyToken, removeCartItem);
router.delete("/", verifyToken, clearCart);

export default router;

