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



    const [error, setError] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        const lastnameRegexr = /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/;
        if (user.lastname && !lastnameRegexr.test(user.lastname)) {
            messageError.lastname = "Entre 2 et 30 caractères attendus."
            isValid = false;
        }
        const firstnameRegexr = /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/;
        if (user.firstname && !firstnameRegexr.test(user.firstname)) {
            messageError.firstname = "Entre 2 et 30 caractères attendus."
            isValid = false;
        }
        const emailRegexr = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (user.email && !emailRegexr.test(user.email)) {
            messageError.email = "Entre 10 et 60 caractères attendus."
            isValid = false;
        }
        const passwordRegexr = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$/;
        if (user.password && !passwordRegexr.test(user.password)) {
            messageError.newMDP = "Entre 8 et 40 caractères, ('m', 'M', et un caractère spécial)."
            isValid = false;
        }
        if (user.password !== user.repeatPassword) {
            messageError.repeatPassword = "Les mots de passe ne sont pas identiques."
            isValid = false;
        }
        
        setError(messageError);
        return isValid;
    }



    const handleChange = (event) => {
        const { name, value } = event.target
        setUser((user) => ({ ...user, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formulaire()) return;

        if (user.password !== user.repeatPassword) {
            toast.error("Les mots de passe ne sont pas identiques.", { autoClose: 3000 })
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/inscription", user)
            if (response.status === 201) {
                navigate("/");
                toast.success("Inscription effectuée avec succès.", { autoClose: 1000 })
            }
        } catch (error) {
            console.log("Echec de l'inscription de l'utilisateur.", error.message)
            toast.error("Un problème est survenu, veuillez nous contacter.", { autoClose: 3000 })
        }
    }

    return (
        <>
            <NavBar />
            <div className={coin.divContainerIn}>
                <div className={coin.boxIn1}>
                    <div className={coin.formIn}>
                        <h1 className={coin.titreCoIn}>Inscription</h1>
                        <form onSubmit={handleSubmit} noValidate>
                            <label className={coin.labelCoIn} htmlFor="firstname">Nom : <span>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="text"
                                name='firstname'
                                id='firstname'
                                onChange={handleChange}
                                minLength={2}
                                maxLength={30}
                                pattern="^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$"
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '').toUpperCase();
                                }}
                            />
                            {error.firstname && <span>{error.firstname}</span>}
                            <br />

                            <label className={coin.labelCoIn} htmlFor="lastname">Prénom : <span>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="text"
                                name='lastname'
                                id='lastname'
                                onChange={handleChange}
                                minLength={2}
                                maxLength={30}
                                pattern="^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$"
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '')
                                }}
                            />
                            {error.lastname && <span>{error.lastname}</span>}
                            <br />

                            <label className={coin.labelCoIn} htmlFor="email">E-mail : <span>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="text"
                                name='email'
                                id='email'
                                onChange={handleChange}
                                minLength={1}
                                maxLength={60}
                                pattern="^[a-zA-Z0-9._%+-]{1,50}@[a-zA-Z0-9.-]{2,30}\.[a-zA-Z]{2,4}$"
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                                }} />
                            {error.email && <span>{error.email}</span>}
                            <br />

                            <label className={coin.labelCoIn} htmlFor="password">Mot de passe : <span>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="password"
                                name='password'
                                id='password'
                                onChange={handleChange}
                                minLength={8}
                                maxLength={40}
                                pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$"
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                                }} />
                            {error.password && <span>{error.password}</span>}
                            <br />

                            <label className={coin.labelCoIn} htmlFor="repeatPassword">Répétez le mot de passe : <span>*</span></label>
                            <input
                                className={coin.inputCoIn}
                                type="password"
                                name='repeatPassword'
                                id='repeatPassword'
                                onChange={handleChange}
                                minLength={8}
                                maxLength={40}
                                pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$"
                                onInput={(event) => {
                                    event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                                }} />
                            {error.repeatPassword && <span>{error.repeatPassword}</span>}
                            <br />

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