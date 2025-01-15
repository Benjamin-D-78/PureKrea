import { React, useContext } from 'react'
import { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';

// ICONES
import voir from "../../images/Icones/voir.png"

// CONTEXT
import { AuthContext } from '../../context/AuthContext.jsx';

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import PanierTotal from "../../components/PanierSynthèse/visuelPanier.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";
import ModalSuppression from '../../components/ModalSuppression/ModalSuppression.jsx';

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "../Commande/commande.module.css"
import mesCommandes from "../MesCommandes/mesCommandes.module.css"
import monProfil from "./monprofil.module.css"

const MonProfil = () => {

    const { id } = useParams();
    const { auth, setAuth } = useContext(AuthContext);





    const [voirA, setVoirA] = useState(false)
    const [voirB, setVoirB] = useState(false)
    const [voirC, setVoirC] = useState(false)

    const voirMDPA = () => {
        setVoirA(!voirA)
    }
    const voirMDPB = () => {
        setVoirB(!voirB)
    }
    const voirMDPC = () => {
        setVoirC(!voirC)
    }








    const [ancienMDP, setAncienMDP] = useState("");
    const [newMDP, setNewMDP] = useState("");
    const [repeteMDP, setRepeteMDP] = useState("");

    const [utilisateur, setUtilisateur] = useState({
        // Obligé de demander si les valeurs sont là sinon je suis embêté par l'erreur des input incontrôllés.
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        phone: "",
        adress: "",
        postal: "",
        town: ""
    });

    const [error, setError] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        phone: "",
        adress: "",
        postal: "",
        town: ""
    })

    useEffect(() => {
        const userById = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/obtenir/${id}`, { withCredentials: true })
                setUtilisateur(response.data)
            } catch (error) {
                console.error("Erreur lors de la recherche de l'utilisateur", error.message)
            }
        }
        userById();
    }, [id])


    // Permet de mettre à jour les valeurs dans le state "utilisateur"
    const handleChange = (event) => {
        const { name, value } = event.target
        setUtilisateur(prev => ({ ...prev, [name]: value })) // "..." fait une copie de l'état précédent.
    };



    const formulaire = () => {
        const messageError = {};
        let isValid = true;

        const lastnameRegexr = /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/;
        if (utilisateur.lastname && !lastnameRegexr.test(utilisateur.lastname)) {
            messageError.lastname = "Entre 2 et 30 caractères attendus."
            isValid = false;
        }
        const firstnameRegexr = /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/;
        if (utilisateur.firstname && !firstnameRegexr.test(utilisateur.firstname)) {
            messageError.firstname = "Entre 2 et 30 caractères attendus."
            isValid = false;
        }
        const emailRegexr = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (utilisateur.email && !emailRegexr.test(utilisateur.email)) {
            messageError.email = "Entre 10 et 60 caractères attendus."
            isValid = false;
        }
        const passwordRegexr = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$/;
        if (newMDP && !passwordRegexr.test(newMDP)) {
            messageError.newMDP = "Entre 8 et 40 caractères, ('m', 'M', et un caractère spécial)."
            isValid = false;
        }
        const phoneRegexr = /^\d{10}$/;
        if (utilisateur.phone && !phoneRegexr.test(utilisateur.phone)) {
            messageError.phone = "10 chiffres attendus."
            isValid = false;
        }
        const adressRegexr = /^[a-zA-Z0-9\s\-'^¨èéàù]{8,70}$/;
        if (utilisateur.adress && !adressRegexr.test(utilisateur.adress)) {
            messageError.adress = "Adresse : Entre 8 et 70 caractères attendus."
            isValid = false;
        }
        const postalRegexr = /^\d{5}$/;
        if (utilisateur.postal && !postalRegexr.test(utilisateur.postal)) {
            messageError.postal = " Code postal : 5 chiffres attendus."
            isValid = false;
        }
        const townRegexr = /^[a-zA-Z\s\-'^¨èéàù]{2,50}$/;
        if (utilisateur.town && !townRegexr.test(utilisateur.town)) {
            messageError.town = "Ville : Entre 2 et 50 caractères attendus."
            isValid = false;
        }

        setError(messageError);
        return isValid;
    }




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formulaire()) return;

        // On crée un objet. On va ici distinguer le MDP des autres champs car changer de MDP doit être une possibilité et non une obligation.
        const updateUser = {};



        // On véritife et ajoute le MDP uniquement s'il a été changé
        if (newMDP && newMDP !== "") {
            // Si un nouveau MDP est renseigné on doit aussi donner l'ancien MDP
            if (!ancienMDP || ancienMDP === "") {
                toast.error("Le mot de passe actuel est requis pour changer de mot de passe.");
                return;
            }

            if (newMDP && newMDP !== repeteMDP) {
                toast.error("Les mots de passe ne correspondent pas.");
                return;
            }

            // On ajoute le MDP modifié à l'objet de mise à jour
            updateUser.password = newMDP; // Nouveau MDP
            updateUser.ancienMDP = ancienMDP; // Ancien MDP pour validation
        }

        // On ajoute les autres champs non liés au MDP uniquement s'ils ont été renseignés, sinon les champs ne seront pas envoyés dans la requête.
        if (utilisateur.lastname) updateUser.lastname = utilisateur.lastname
        if (utilisateur.firstname) updateUser.firstname = utilisateur.firstname
        if (utilisateur.email) updateUser.email = utilisateur.email
        if (utilisateur.phone) updateUser.phone = utilisateur.phone
        if (utilisateur.adress) updateUser.adress = utilisateur.adress
        if (utilisateur.postal) updateUser.postal = utilisateur.postal
        if (utilisateur.town) updateUser.town = utilisateur.town

        try {
            const response = await axios.put(`http://localhost:8000/api/user/update/${auth._id}`, updateUser, { withCredentials: true }
            );

            if (response.status === 200) {
                toast.success("Profil mis à jour avec succès. Nous vous invitons à vous reconnecter pour voir vos nouvelles données.", { autoClose: 5000 });
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations.", error);
            toast.error("Une erreur s'est produite lors de la mise à jour des informations. Veuillez nous contacter.", { autoClose: 3000 });
        }
    };



    return (
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Mon profil</h1>


            <div className={commande.conteneurGlobal}>
                <div className={commande.conteneurG}>
                    <PanierTotal />
                    <PrenezRendezVous />
                    <Accordeon />
                </div>
                <div>
                    <div className={commande.blocEntete1}>
                        <div className={commande.entete1}>
                            <p className={commande.pName}>Récapitulatif</p>
                        </div>
                    </div>
                    <div className={mesCommandes.conteneurD}>
                        <div className={mesCommandes.conteneurGeneralRecap}>

                            <form onSubmit={handleSubmit} noValidate>
                                <p className={monProfil.nomEntete}>Connexion & sécurité</p>
                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Nom : </label>
                                        <label htmlFor="lastname">Nouveau nom : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.lastname ? (<span className={monProfil.pUtilisateur}>{utilisateur.lastname}</span>) : <span>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='lastname'
                                            id='lastname'
                                            onChange={handleChange}
                                            minLength={2}
                                            maxLength={30}
                                            pattern="^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$"
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '').toUpperCase();
                                            }}
                                        />
                                        {error.lastname && <span>{error.lastname}</span>}
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Prénom : </label>
                                        <label htmlFor="firstname">Nouveau prénom : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.firstname ? (<span className={monProfil.pUtilisateur}>{utilisateur.firstname}</span>) : <span>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='firstname'
                                            id='firstname'
                                            onChange={handleChange}
                                            minLength={2}
                                            maxLength={30}
                                            pattern="^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$"
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(/[^a-zA-ZàèéùÀÈÉÙ'-\s]/g, '')
                                            }}
                                        />
                                        {error.firstname && <span>{error.firstname}</span>}
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Email : </label>
                                        <label htmlFor="email">Nouveau mail : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.email ? (<span className={monProfil.pUtilisateur}>{utilisateur.email}</span>) : <span>Information manquante</span>}
                                        <input
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
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonneesMDP}>
                                    <div className={monProfil.labelsProfil}>
                                        <label className={monProfil.labelsSepare} htmlFor="ancienMDP">Mot de passe actuel : </label>
                                        <label className={monProfil.labelsSepare} htmlFor="newMDP">Nouveau mot de passe : </label>
                                        <label htmlFor="repeteMDP">Répétez le mot de passe : </label>
                                    </div>
                                    <div className={monProfil.contientInputImg}>
                                        <div className={monProfil.inputsMDP}>
                                            <input
                                                className={monProfil.inputsSepare}
                                                type={voirA ? "text" : "password"}
                                                name='ancienMDP'
                                                id='ancienMDP'
                                                value={ancienMDP}
                                                minLength={8}
                                                maxLength={40}
                                                pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$"
                                                onChange={(event) => setAncienMDP(event.target.value)}
                                                onInput={(event) => {
                                                    event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                                                }} />
                                            <input
                                                className={monProfil.inputsSepare}
                                                type={voirB ? "text" : "password"}
                                                name='newMDP'
                                                id='newMDP'
                                                value={newMDP}
                                                minLength={8}
                                                maxLength={40}
                                                pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$"
                                                onChange={(event) => setNewMDP(event.target.value)}
                                                onInput={(event) => {
                                                    event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                                                }} />
                                            <input
                                                type={voirC ? "text" : "password"}
                                                name='repeteMDP'
                                                id='repeteMDP'
                                                value={repeteMDP}
                                                minLength={8}
                                                maxLength={40}
                                                pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$"
                                                onChange={(event) => setRepeteMDP(event.target.value)}
                                                onInput={(event) => {
                                                    event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                                                }} />
                                            {error.newMDP && <span>{error.newMDP}</span>}
                                        </div>
                                        <div>
                                            <div className={monProfil.contientVoir}>
                                                <img onClick={voirMDPA} className={monProfil.voir} src={voir} alt="Voir le mot de passe" />
                                            </div>
                                            <div className={monProfil.contientVoir}>
                                                <img onClick={voirMDPB} className={monProfil.voir} src={voir} alt="Voir le mot de passe" />
                                            </div>
                                            <div className={monProfil.contientVoir}>
                                                <img onClick={voirMDPC} className={monProfil.voir} src={voir} alt="Voir le mot de passe" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label htmlFor="phone">Téléphone : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        <input
                                            type="text"
                                            name='phone'
                                            id='phone'
                                            onChange={handleChange}
                                            value={utilisateur?.phone || ""}
                                            minLength={1}
                                            maxLength={10}
                                            pattern="^\d{10}$"
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(/\D/g, '')
                                            }} />
                                        {error.phone && <span>{error.phone}</span>}
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <p className={monProfil.nomEntete}>Adresse</p>

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label className={monProfil.labelsSepare} htmlFor="adress">Adresse : </label>
                                        <label className={monProfil.labelsSepare} htmlFor="postal">Code postal : </label>
                                        <label htmlFor="town">Ville : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        <input
                                            className={monProfil.inputsSepare}
                                            type="text"
                                            name='adress'
                                            id='adress'
                                            value={utilisateur?.adress || ""}
                                            minLength={8}
                                            maxLength={70}
                                            pattern="[a-zA-Z0-9\s\-'^¨èéàù]{8,70}"
                                            onChange={handleChange}
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s\-'^¨èéàù]/g, '');
                                            }} />

                                        <input
                                            className={monProfil.inputsSepare}
                                            type="text"
                                            name='postal'
                                            id='postal'
                                            value={utilisateur?.postal || ""}
                                            minLength={1}
                                            maxLength={5}
                                            onChange={handleChange}
                                            pattern="^\d{5}$"
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(/\D/g, '')
                                            }} />

                                        <input
                                            type="text"
                                            name='town'
                                            id='town'
                                            value={utilisateur?.town || ""}
                                            minLength={2}
                                            maxLength={50}
                                            onChange={handleChange}
                                            pattern="^[a-zA-Z\s\-'^¨èéàù]{2,50}$"
                                            onInput={(event) => {
                                                // Remplacer tous les caractères non autorisés, y compris les chiffres
                                                event.target.value = event.target.value.replace(/[^a-zA-Z\s\-'^¨èéàù]/g, '').toUpperCase();;
                                            }} />
                                        {error.adress && <span>{error.adress}</span>}
                                        {error.postal && <span>{error.postal}</span>}
                                        {error.town && <span>{error.town}</span>}
                                    </div>
                                </div>
                                <div className={monProfil.contientBtn}>
                                    <button className={monProfil.btnEnvoi}>Enregistrer les modifications</button>
                                </div>
                            </form>
                            <ModalSuppression />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default MonProfil