import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: null,
  data: [],
  error: false
}

// Création de mon slice pour mes utilisateurs
export const User = createSlice({
    name: "User", // Nom de mon slice
    initialState, // Etat initial
    reducers: {
        USER_DEPART: (state) => {
            state.loading = true
        },
        USER_ARRIVE: (state, action) => {
            state.loading = false // Chargement terminé
            state.data = action.payload // Je charge les données dans data
        }
    }
})

// J'exporte les actions pour pouvoir les utiliser dans mes composants
export const {USER_DEPART, USER_ARRIVE} = User.actions;
export default User.reducer; // J'exporte le reducer pour l'ajouter au store