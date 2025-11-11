import express from "express";
import { 
    publicSalesPdf, 
    publicSalesXlsx,
    publicInventoryPdf,
    publicInventoryXlsx
} from "../controllers/publicReportController.js";

const router = express.Router();
router.get("/sales-summary.pdf", publicSalesPdf);
router.get("/sales-summary.xlsx", publicSalesXlsx);
router.get("/inventory-summary.pdf", publicInventoryPdf);
router.get("/inventory-summary.xlsx", publicInventoryXlsx);

export default router;

