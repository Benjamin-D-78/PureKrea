import express from "express"
// import multer from "multer";
import { creationItem, allItems, itemID, upItem } from "../controllers/item.controller.js"

const router = express.Router();

router.post("/creation", creationItem);
router.get("/all", allItems);
router.get("/obtenir/:id", itemID);
router.put("/update/:id", upItem);

export default router