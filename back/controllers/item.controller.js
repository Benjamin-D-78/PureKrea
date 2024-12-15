import Item from "../models/item.model.js";

// CREATION ITEM
export const creationItem = async (req, res) => {
    try {
        console.log(req.body);
        const response = await Item.create(req.body);

        res.status(201).json({Message: "Item créé avec succès.", response});

    } catch (error) {
        res.status(500).json({Message: "Echec lors de création de l'item.", error});
    }
};

// GET ALL ITEMS
export const allItems = async (req, res) => {
    try {
        const response = await Item.find();
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({Message: "Echec de la récupération de tous les items.", error});
    }
};

// ITEM BY ID
export const itemID = async (req,res) => {
    try {
        const response = await Item.findById(req.params.id);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({Message: "Echec lors de la récupération de l'item.", error})
    }
}

// PUT - UPDATE BY ID
export const upItem = async (req,res) => {
    try {
        const response = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({Message: "Item mis à jour avec succès.", response});

    } catch (error) {
        res.status(500).json({Message: "Echec lors de la mise à jour de l'item.", error})
    }
}

// DELETE
export const deleteItem = async (req, res) => {
    try {
        const response = await Item.findByIdAndDelete(req.params.id)

        res.status(200).json({Message: "Item supprimé avec succès.", response})

    } catch (error) {
        res.status(500).json({Message: "Echec lors de la suppression de l'item/", error})
    }
}