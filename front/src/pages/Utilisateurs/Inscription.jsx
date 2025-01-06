import { React, useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import coin from "./coin.module.css"

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar"
import Footer from '../../components/Footer/Footer'


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
            toast.error("Les mots de passe ne sont pas identiques.", {autoClose: 3000})
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/inscription", user)
            if (response.status === 201) {
                navigate("/");
                toast.success("Inscription effectuée avec succès.", {autoClose: 1000})
            }
        } catch (error) {
            console.log("Echec de l'inscription de l'utilisateur.", error.message)
            toast.error("Un problème est survenu, veuillez nous contacter.", {autoClose: 3000})
        }
    }

    return (
        <>
        <NavBar />
            <div className={coin.divContainerIn}>
                <div className={coin.boxIn1}>
                <div className={coin.formIn}>
                    <h1 className={coin.titreCoIn}>Inscription</h1>
                    <form onSubmit={handleSubmit}>
                        <label className={coin.labelCoIn} htmlFor="firstname">Nom : <span>*</span></label>
                        <input
                            className={coin.inputCoIn}
                            type="text"
                            name='firstname'
                            id='firstname'
                            onChange={handleChange} />
                        <label className={coin.labelCoIn} htmlFor="lastname">Prénom : <span>*</span></label>
                        <input
                            className={coin.inputCoIn}
                            type="text"
                            name='lastname'
                            id='lastname'
                            onChange={handleChange} />
                        <label className={coin.labelCoIn} htmlFor="email">E-mail : <span>*</span></label>
                        <input
                            className={coin.inputCoIn}
                            type="text"
                            name='email'
                            id='email'
                            onChange={handleChange} />
                        <label className={coin.labelCoIn} htmlFor="password">Mot de passe : <span>*</span></label>
                        <input
                            className={coin.inputCoIn}
                            type="password"
                            name='password'
                            id='password'
                            onChange={handleChange} />
                        <label className={coin.labelCoIn} htmlFor="repeatPassword">Répétez le mot de passe : <span>*</span></label>
                        <input
                            className={coin.inputCoIn}
                            type="password"
                            name='repeatPassword'
                            id='repeatPassword'
                            onChange={handleChange} />

                        <button className={coin.submitCoIn}>M'inscrire</button>
                        <Link className={coin.connexion} to="/connexion">Déjà inscrit ?</Link>
                    </form>
                </div>
                </div>
                <div className={coin.boxCoIn2}>
                    <Footer />
                    </div>
            </div>
        </>
    )
}

export default Inscription