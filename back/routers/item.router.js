import express from "express"
import upload from "../service/multer.cjs"; 
import { creationItem, allItems, itemID, upItem, deleteItem } from "../controllers/item.controller.js"

const router = express.Router();

router.post("/creation", upload.array("img", 4), creationItem);
router.get("/all", allItems);
router.get("/obtenir/:id", itemID);
router.put("/update/:id", upItem);
router.delete("/delete/:id", deleteItem);

export default router