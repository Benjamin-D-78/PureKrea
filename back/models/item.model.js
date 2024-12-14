import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: false},
    price: {type: Number, required: true},
    picture: {
        img: {type: String, required: false},
        img2: {type: String},
        img3: {type: String},
        img4: {type: String}
    },
    status: {type: Boolean, required: true},
})

export default mongoose.model("Item", itemSchema);