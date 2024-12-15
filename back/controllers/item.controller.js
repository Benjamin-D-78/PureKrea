import Item from "../models/item.model.js";

// CREATION ITEM
export const creationItem = async (req, res) => {
    try {
        console.log(req.body);
        const response = await Item.create(req.body);

        res.status(201).json(response);

    } catch (error) {
        res.status(500).json(error.message);
    }
};

// GET ALL ITEMS
export const allItems = async (req, res) => {
    try {
        const response = await Item.find();
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message);
    }
};

// ITEM BY ID
export const itemID = async (req,res) => {
    try {
        const response = await Item.findById(req.params.id);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// PUT - UPDATE BY ID
export const upItem = async (req,res) => {
    try {
        const response = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// DELETE
export const deleteItem = async (req, res) => {
    try {
        const response = await Item.findByIdAndDelete(req.params.id)

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error.message)
    }
}