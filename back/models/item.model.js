import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator'

const itemSchema = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    width: {type: Number, required: true},
    color: {type: String, required: true},
    content: {type: String, required: true},
    detail: {type: String, required: true},
    category: {type: Number, required: true},
    stock: {type: Number, required: true},
    price: {type: Number, required: true},
    picture: {
        img: {type: String, required: false},
        img2: {type: String},
        img3: {type: String},
        img4: {type: String}
    },
    status: {type: Boolean, required: true},
})

itemSchema.plugin(mongooseUniqueValidator) // Vérifie que les champs déclarés comme unique le sont bien dans la BDD
export default mongoose.model("Item", itemSchema);