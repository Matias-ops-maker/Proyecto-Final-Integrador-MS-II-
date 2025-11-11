import express from "express";
import { 
    listProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getProductsByVehicle 
} from "../controllers/productController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", listProducts);
router.get("/vehicle/:vehicle_id", getProductsByVehicle);
router.get("/:id", getProduct);
router.post("/", verifyToken, verifyAdmin, createProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;

