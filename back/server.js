import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from 'path'; // Module pour gérer les chemins de fichiers
import { fileURLToPath } from 'url'; // Module pour convertir les URL en chemins de fichiers
import { env } from "./config/index.js"


const __filename = fileURLToPath(import.meta.url); // Obtient le chemin du fichier actuel
const __dirname = path.dirname(__filename); // Obtient le répertoire du fichier actuel

// ROUTES
import userRoutes from "./routers/user.router.js"
import itemRoutes from "./routers/item.router.js"

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
    origin: `http://localhost:3000`,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Ce middleware permet de servir les fichiers statiques du dossier 'uploads'. Il rend les fichiers uploadés (comme les images) accessibles via l'URL '/uploads'
// Par exemple: une image 'photo.jpg' sera accessible via http://localhost:8000/uploads/photo.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true })); // Ce middleware permet de traiter les données envoyées via des formulaires HTML extended: true permet de gérer des objets imbriqués dans les données du formulaire

// PREFIXES ROUTES
app.use("/api/user", userRoutes)
app.use("/api/item", itemRoutes)

// SERVER
app.listen(PORT, () => {
    console.log(`Ecoute sur le port : ${PORT}`);
})