import { React, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import items from "../Dashboard/css/items.module.css"
import { URL } from "../../utils/Constantes";

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
            const response = await axios.post(URL.USER_INSCRIPTION, user)
            console.log(response)
            toast.success("Utilisateur ajouté avec succès.", { autoClose: 1000 })
        } catch (error) {
            console.log("Echec de l'ajout de l'utilisateur.", error.message)
            toast.error("Echec de l'ajout de l'utilisateur.", { autoClose: 3000 })
        }
    }


    return (
        <div className={items.conteneurPrincipal}>
            <h1 className={items.h1}>Ajouter un utilisateur</h1>
            <div className={items.div1}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstname">Nom * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='firstname'
                        id='firstname'
                        onChange={handleChange} />
                    <label htmlFor="lastname">Prénom * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='lastname'
                        id='lastname'
                        onChange={handleChange} />
                    <label htmlFor="email">E-mail * :</label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='email'
                        id='email'
                        onChange={handleChange} />
                    <label htmlFor="phone">Téléphone : </label>
                    <input
                        className={items.inputItem}
                        type="number"
                        name='phone'
                        id='phone'
                        onChange={handleChange} />
                    <label htmlFor="adress">Adresse : </label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='adress'
                        id='adress'
                        onChange={handleChange} />
                    <label htmlFor="postal">Code postal : </label>
                    <input
                        className={items.inputItem}
                        type="number"
                        name='postal'
                        id='postal'
                        onChange={handleChange} />
                    <label htmlFor="town">Ville : </label>
                    <input
                        className={items.inputItem}
                        type="text"
                        name='town'
                        id='town'
                        onChange={handleChange} />
                    <label htmlFor="password">Mot de passe * :</label>
                    <input
                        className={items.inputItem}
                        type="password"
                        name='password'
                        id='password'
                        onChange={handleChange} />
                    <label htmlFor="repeatPassword">Répétez * :</label>
                    <input
                        className={items.inputItem}
                        type="password"
                        name='repeatPassword'
                        id='repeatPassword'
                        onChange={handleChange} />

                    <div className={items.divBtnAjouter}>
                        <button className={items.boutonItem}>Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    )


}

export default AjoutUtilisateur