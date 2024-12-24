import jwt from "jsonwebtoken"
import {env} from "../config/index.js"
import { newError } from "./error.js"

// Vérification du Token
export const Token = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(newError(401, "Accès refusé."))

    jwt.verify(token, env.TOKEN, (err, user) => {
        if(err) {
            return next(newError(403, "Token non valide."))
        }
    req.user = user;
    next();

})}