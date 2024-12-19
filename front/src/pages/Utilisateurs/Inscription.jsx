import React from 'react'
import { useState } from 'react'
import axios from "axios"
import NavBar from "../../components/NavBar/NavBar"
import inscription from "./inscription.module.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Inscription = () => {

    const [user, setUser] = useState({
        isActive: true
    })
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser((user) => ({ ...user, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(user.password !== user.repeatPassword){
            alert("Les mots de passe ne sont pas identique.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/inscription", user)
            if (response.status === 201) {
                navigate("/");
            }
        } catch (error) {
            console.log("Echec de l'inscription de l'utilisateur.", error.message)
        }
    }

    return (
        <><NavBar />

            <div className={inscription.divContainer}>
                <div className={inscription.divInscription}>
                    <form className={inscription.formInscription} onSubmit={handleSubmit}>
                        <label className={inscription.labelInscription} htmlFor="firstname">Nom : <span>*</span></label>
                        <input
                            className={inscription.inputInscription}
                            type="text"
                            name='firstname'
                            id='firstname'
                            onChange={handleChange} />
                        <label className={inscription.labelInscription} htmlFor="lastname">Prénom : <span>*</span></label>
                        <input
                            className={inscription.inputInscription}
                            type="text"
                            name='lastname'
                            id='lastname'
                            onChange={handleChange} />
                        <label className={inscription.labelInscription} htmlFor="email">E-mail : <span>*</span></label>
                        <input
                            className={inscription.inputInscription}
                            type="text"
                            name='email'
                            id='email'
                            onChange={handleChange} />
                        <label className={inscription.labelInscription} htmlFor="password">Mot de passe : <span>*</span></label>
                        <input
                            className={inscription.inputInscription}
                            type="password"
                            name='password'
                            id='password'
                            onChange={handleChange} />
                        <label className={inscription.labelInscription} htmlFor="repeatPassword">Répétez le mot de passe : <span>*</span></label>
                        <input
                            className={inscription.inputInscription}
                            type="password"
                            name='repeatPassword'
                            id='repeatPassword'
                            onChange={handleChange} />

                        <button className={inscription.submitInscription}>M'inscrire</button>
                        <Link className={inscription.connexion} to="/connexion">Déjà inscrit ?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Inscription