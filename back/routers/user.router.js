import express from "express";
// import { Token } from "../middlewares/auth";
import { inscription } from "../controllers/user.controller.js";

const router = express.Router()

router.post("/inscription", inscription)

export default router