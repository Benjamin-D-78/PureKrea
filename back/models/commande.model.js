import mongoose from 'mongoose';

const commandeSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    panier: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    prixTotal: { type: Number, required: true },
    // statut: { type: String, default: 'en attente' },
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Commande', commandeSchema);
