import cookieParser from "cookie-parser"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { env } from "./config/index.js"


// ROUTAGE
import userRoutes from "./routers/user.router.js"
import itemRoutes from "./routers/item.router.js"
import commandeRoutes from "./routers/commande.router.js"

// APP EXPRESS
const app = express()


// PORT
const PORT = env.PORT || 8000

// DATABASE MONGOOSE
mongoose
    .connect(env.MONGO_URI_LOCAL, {dbName: env.DB_NAME})
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(error => console.log("Echec de la connexion à MongoDB : ", error))

// MIDDLEWARE
app.use(cors({
    origin: "http://localhost:3000",
    methods: 'GET, POST, DELETE, PUT',
    credentials: true,
    allowedHeaders: ['Content-Type','Authorization','Cookie'],
    exposedHeaders: ['Set-Cookies']
}));
app.use(express.json());
app.use(cookieParser());

// PREFIXES ROUTES
app.use("/api/user", userRoutes)
app.use("/api/item", itemRoutes)
app.use("/api/commande", commandeRoutes)

// SERVER
app.listen(PORT, () => {
    console.log(`Ecoute sur le port : ${PORT}`);
})