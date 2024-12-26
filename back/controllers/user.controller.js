import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/index.js";


// SIGNUP ( hashage du MDP avec "bcrypt" contenu dans une variable)
export const inscription = async (req, res, next) => {
    try {
        const hashedMDP = await bcrypt.hash(req.body.password, 10)

        await userModel.create({ ...req.body, password: hashedMDP });

        res.status(201).json({Message: "L'utilisateur a bien été créé."});

    } catch (error) {
        console.log("Echec lors de l'inscription : ", error)
        next(error);
    }
}

// CONNEXION
export const connexion = async (req, res, next) => {
    try {
        // Recherche de l'utilisateur dans la BDD
        const rechercheUser = await userModel.findOne({email: req.body.email});

        if(!rechercheUser) return res.status(404).json({Message: "Utilisateur non trouvé."});

        // Comparaison du MDP fourni dans la requête avec le MDP dans la BDD.
        const compareMDP = await bcrypt.compare(req.body.password, rechercheUser.password)

        if(!compareMDP) return res.status(400).json({Message: "Mauvais Mot De Passe."})

        // Création du Token de connexion avec expiration sous 24h.
        // Ici nous incluons l'ID de l'utilisateur dans lequel on signe le token via la clé secrète (env.token).
        // L'expiration prend au bout de 24h.
        const tokenUser = jwt.sign({id: rechercheUser._id}, env.TOKEN, {expiresIn: "24h"}) // TOKEN = valeur du token renseigné dans mon ".env"

        // On procède à l'extraction du MDP. Les autres propriétés sont regroupées dans un nouvel objet : "others".
        const {password, ...others} = rechercheUser._doc

        // Envoi du token sous forme de cookie HTTPonly, alors qu'avant le MDP était stocké dans le local storage.
        res.cookie("access_token", tokenUser, {
            httpOnly: true,
            secure: false, // A mettre sur "true" lors d'une mis een ligne du site.
            sameSite: "strict", // Protège des attaques CSRF (usurpation d'identité, etc.)
            maxAge: 24*60*60*1000 // 24h en millisecondes.
        })
        .status(200)
        .json(others) // Renvoie les données en réponse à l'exception du MDP.

    } catch (error) {
        console.log("Echec total lors de la tentative de connexion : ", error)
        next(error)
    }
};

// GET ALL USERS
export const allUsers = async (req, res) => {
    try {
        const response = await userModel.find();
        res.status(200).json(response);
    } catch (error) {
        console.log("Echec lors de la réception des utilisateurs : ", error);
    }
};

// GET USER BY ID
export const userID = async (req, res) => {
    try {
        const response = await userModel.findById(req.params.id)

        if(response) res.status(200).json(response)
    } catch (error) {
        console.log("Echec lors de la réception de l'utilisateur : ", error)
    }
}

// UPDATE USER
export const upUser = async (req, res) => {
    try { // On vérifie si l'utilisateur existe :
        const response = await userModel.findById(req.params.id);

        if(!response) return res.status(404).json({Message: "Utilisateur non trouvé."});

        // toString (avec majuscule !) ; ici on compare si l'id de l'utilisateur à updater est le même id que l'utilisateur qui souhaite faire cet update.
        // req.user.id car on fait appel au "user" définit dans le "auth.js".
        if(req.user.id !== response._id.toString()){
            return res.status(403).json({Message: "Accès refusé : vous n'êtes pas l'utilisateur concerné."})
        }

        // Mise à jour de l'utilisateur :
        const update = await userModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true})
        res.status(200).json({message: "Informations mises à jour avec succès.", update})

    } catch (error) {
        console.log("Erreur lors de la tentative de mise à jour : ", error)
    }
}

// DELETE USER
export const deleteUser = async (req, res) => {
    try { // On vérifie si l'utilisateur existe :
        const response = await userModel.findById(req.params.id);

        if(!response) return res.status(404).json({message: "Utilisateur non trouvé."});

        if(req.user.id !== response._id.toString() && req.user.role !== 'admin'){
            return res.status(403).json({message: "Accès refusé : vous n'êtes pas l'utilisateur concerné."})
        }

        // Suppression de l'utilisateur
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Utilisateur supprimé avec succès."});

    } catch (error) {
        console.log("Erreur lors de la tentative de suppression : ", error);
    }
};