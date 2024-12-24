import { createSlice } from "@reduxjs/toolkit"; //Pour créer un Reducer avec moins de code

const initialState = {
    loading: null,
    data: [],
    error: false
}

// Création de mon slice pour mes items
export const Item = createSlice({
    name: "Item", // Nom de mon slice
    initialState, // Etat initial
    reducers: {
        ITEM_DEPART: (state) => {
            state.loading = true
        },
        ITEM_ARRIVE: (state, action) => {
            state.loading = false // Chargement terminé
            state.data = action.payload // Je charge les données dans data
        }
    }
})

// J'exporte les actions pour pouvoir les utiliser dans mes composants.
export const {ITEM_DEPART, ITEM_ARRIVE} = Item.actions;
export default Item.reducer; //J'exporte le reducer pour l'ajouter au store