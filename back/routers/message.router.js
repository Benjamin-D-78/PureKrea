import express from "express"
import { creationMessage, allMessage, messageID, deleteMessage } from "../controllers/contact.controller.js"

const router = express.Router();

router.post("/creation", creationMessage);
router.get("/all", allMessage);
router.get("/obtenir/:id", messageID);
router.delete("/delete/:id", deleteMessage);

export default router