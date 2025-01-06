import React from "react";
import { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

const AjoutUtilisateur = () => {

    const [user, setUser] = useState({
        isActive: true
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser((user) => ({ ...user, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.password !== user.repeatPassword) {
            alert("Les mots de passe ne sont pas identiques.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/inscription", user)
            console.log(response)
            toast.success("Utilisateur ajouté avec succès.", {autoClose: 1000})
        } catch (error) {
            console.log("Echec de l'ajout de l'utilisateur.", error.message)
            toast.error("Echec de l'ajout de l'utilisateur.", {autoClose: 3000})
        }
    }


    return (
        <div>
            <h1>Ajouter un utilisateur</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">Nom : <span>*</span></label>
                <input
                    type="text"
                    name='firstname'
                    id='firstname'
                    onChange={handleChange} />
                <label htmlFor="lastname">Prénom : <span>*</span></label>
                <input
                    type="text"
                    name='lastname'
                    id='lastname'
                    onChange={handleChange} />
                <label htmlFor="email">E-mail : <span>*</span></label>
                <input
                    type="text"
                    name='email'
                    id='email'
                    onChange={handleChange} />
                <label htmlFor="password">Mot de passe : <span>*</span></label>
                <input
                    type="password"
                    name='password'
                    id='password'
                    onChange={handleChange} />
                <label htmlFor="repeatPassword">Répétez le mot de passe : <span>*</span></label>
                <input
                    type="password"
                    name='repeatPassword'
                    id='repeatPassword'
                    onChange={handleChange} />

                <button>Ajouter</button>
            </form>
        </div>
    )


}

export default AjoutUtilisateur