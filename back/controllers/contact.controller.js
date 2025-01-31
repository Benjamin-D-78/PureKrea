import Contact from "../models/contact.model.js";

// CREATION MESSAGE
export const creationMessage = async (req, res) => {
    try {
        const response = await Contact.create(req.body);
        res.status(201).json({Message: "Message envoyé avec succès.", response})
    } catch (error) {
        console.error(error);
        res.status(500).json({Message: "Echec lors de la création du message.", error});
    }
}

// GET ALL MESSAGES
export const allMessage = async (req, res) => {
    try {
        const response = await Contact.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({Message: "Echec lors de la récupération des messages.", error});
    }
}

// MESSAGE BY ID
export const messageID = async (req, res) => {
    try {
        const response = await Contact.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({Message: "Echec lors de la récupération du message.", error})
    }
}

// DELETE MESSAGE
export const deleteMessage = async (req, res) => {
    try {
        const response = await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json({Message: "Message supprimé avec succès.", response})
    } catch (error) {
        res.status(500).json({Message: "Echec de la tentative de suppression du message.", error})
    }
}