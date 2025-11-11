import express from "express";
import { 
    salesPdf, 
    salesXlsx,
    inventoryPdf,
    inventoryXlsx,
    dashboardStats 
} from "../controllers/reportController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.get("/sales/pdf", verifyToken, verifyAdmin, salesPdf);
router.get("/sales/xlsx", verifyToken, verifyAdmin, salesXlsx);
router.get("/inventory/pdf", verifyToken, verifyAdmin, inventoryPdf);
router.get("/inventory/xlsx", verifyToken, verifyAdmin, inventoryXlsx);
router.get("/dashboard", verifyToken, verifyAdmin, dashboardStats);

export default router;

