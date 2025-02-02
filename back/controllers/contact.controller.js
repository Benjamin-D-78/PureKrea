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
        const response = await Contact.find().sort({date: -1});
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

// UPDATE MESSAGE
export const updateMessage = async (req,res) => {
    try {
          //  "req.params.id" : on récupère l'id du document qu'on veut metre à jour.
        //  "req.body" : contient les nouvelles données envoyées par le client dans le corps de la requête.
        //  "{new: true}" : C'est une option qui permet à la méthode de retourner le document mis à jour plutôt que l'original. Si on ne met pas cette option, la méthode retournera l'état du document avant la MAJ.
        const response = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({Message: "Message modifié avec succès.", response});
    } catch (error) {
        res.status(500).json({Message: "Echec lors de la modification du message.", error})
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