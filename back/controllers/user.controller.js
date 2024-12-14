import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { env } from "../config/index";


// SIGNUP ( hashage du MDP avec "bcrypt" contenu dans une variable)
export const inscription = async (req, res, next) => {

    try {
        const hashedMDP = await bcrypt.hash(req.body.password, 10)

        await userModel.create({ ...req.body, password: hashedMDP });

        res.status(201).json("L'utilisateur a bien été créé.");

    } catch (error) {
        next(error);
    }
}