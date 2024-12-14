import jwt from "jsonwebtoken"
import {env} from "../config/index"
import { newError } from "./error"

// Vérification du Token
export const Token = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(newError(401, "Accès refusé."))

    jwt.verify(token, env.token, (err, uder) => {
        if(err) {
            return next(newError(403, "Token non valide."))
        }
    req.user = user
    next()

})}