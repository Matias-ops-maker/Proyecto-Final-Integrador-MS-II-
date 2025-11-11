import express from "express";
import { 
    placeOrder, 
    listOrders, 
    getOrder,
    updateOrderStatus,
    getOrderStats 
} from "../controllers/orderController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/", verifyToken, placeOrder);
router.get("/", verifyToken, listOrders);
router.get("/:id", verifyToken, getOrder);
router.put("/:id/status", verifyToken, verifyAdmin, updateOrderStatus);
router.get("/admin/stats", verifyToken, verifyAdmin, getOrderStats);

export default router;

