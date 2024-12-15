import express from "express";
import { Token } from "../middlewares/auth.js";
import { inscription, connexion, allUsers, userID, upUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router()

router.post("/inscription", inscription)
router.post("/connexion", connexion)
router.get("/all", allUsers)
router.get("/obtenir/:id", userID)
router.put("/update/:id", Token, upUser)
router.delete("/delete/:id", Token, deleteUser)

export default router