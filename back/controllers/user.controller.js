import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/index";


// SIGNUP ( hashage du MDP avec "bcrypt" contenu dans une variable)
export const signup = async (req, res, next) => {

}