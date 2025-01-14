import { React, useContext } from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import ConnectezVous from "../../components/ConnectezVous/connectezVous.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "../Commande/commande.module.css"
import mesCommandes from "../MesCommandes/mesCommandes.module.css"
import monProfil from "./monprofil.module.css"

const MonProfil = () => {

    const { id } = useParams();
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();





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



    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/user/delete/${id}`)
            if(response.status === 200){
                setAuth();
                toast.success("Compte supprimé avec succès.", {autoClose: 2000})
                navigate("/connexion")
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du profil", error)
        }
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
        // const messageError = {};
        let isValid = true;

        const lastnameRegexr = /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/;
        if (utilisateur.lastname && !lastnameRegexr.test(utilisateur.lastname)) {
            toast.error("Votre nom doit contenir entre 2 et 30 caractères. Les caractères spéciaux ne sont pas autorisés.")
            isValid = false;
        }
        const firstnameRegexr = /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/;
        if (utilisateur.firstname && !firstnameRegexr.test(utilisateur.firstname)) {
            toast.error("Votre prénom doit contenir entre 2 et 30 caractères. Les caractères spéciaux ne sont pas autorisés.")
            isValid = false;
        }
        const emailRegexr = /^(?![.-_])[A-Za-z0-9._-]{8,58}[A-Za-z0-9]@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (utilisateur.email && !emailRegexr.test(utilisateur.email)) {
            toast.error("Votre mail doit contenir entre 10 et 60 caractères. A l'exception de '-' et '_', les caractères spéciaux ne sont pas autorisés.")
            isValid = false;
        }
        // const passwordRegexr = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[^\w\s?!/\^$=+*:]))[A-Za-z\d^\w\s?!/\^$=+*:]{10,50}$/;
        // if (newMDP && !passwordRegexr.test(newMDP)) {
        //     toast.error("Votre mot de passe doit contenir entre 10 et 50 caractères, dont une minusculte, une majuscule, un chiffre et un caractère spécial.")
        //     isValid = false;
        // }

        const phoneRegexr = /^\d{10}$/;
        if (utilisateur.phone && !phoneRegexr.test(utilisateur.phone)) {
            toast.error("Votre numéro doit comporter 10 chiffres.")
            isValid = false;
        }

        // setError(messageError);
        return isValid;
    }




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formulaire()) return;

        // On crée un objet. On va ici distinguer le MDP des autres champs car changer de MDP doit être une possibilité et non une obligation.
        const updateUser = {};

        if (newMDP && newMDP !== repeteMDP) {
            toast.error("Les mots de passe ne correspondent pas.");
            return;
        }

        // On véritife et ajoute le MDP uniquement s'il a été changé
        if (newMDP && newMDP !== "") {
            // Si un nouveau MDP est renseigné on doit aussi donner l'ancien MDP
            if (!ancienMDP || ancienMDP === "") {
                toast.error("Le mot de passe actuel est requis pour changer de mot de passe.");
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

                            <form onSubmit={handleSubmit}>
                                <p className={monProfil.nomEntete}>Connexion & sécurité</p>
                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Nom : </label>
                                        <label htmlFor="lastname">Nouveau nom : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.lastname ? (<span className={monProfil.pUtilisateur}>{utilisateur.lastname}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
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
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Prénom : </label>
                                        <label htmlFor="firstname">Nouveau prénom : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.firstname ? (<span className={monProfil.pUtilisateur}>{utilisateur.firstname}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
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
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Email : </label>
                                        <label htmlFor="email">Nouveau mail : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.email ? (<span className={monProfil.pUtilisateur}>{utilisateur.email}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='email'
                                            id='email'
                                            onChange={handleChange}
                                            pattern="^(?![.-_])[A-Za-z0-9._-]{8,58}[A-Za-z0-9]@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$"
                                            onInput={(event) => {
                                                event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                                            }} />
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
                                                // pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[^\w\s?!/\^$=+*:]))[A-Za-z\d^\w\s?!/\^$=+*:]{10,50}$"
                                                onChange={(event) => setAncienMDP(event.target.value)} />
                                            <input
                                                className={monProfil.inputsSepare}
                                                type={voirB ? "text" : "password"}
                                                name='newMDP'
                                                id='newMDP'
                                                value={newMDP}
                                                // pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[^\w\s?!/\^$=+*:]))[A-Za-z\d^\w\s?!/\^$=+*:]{10,50}$"
                                                onChange={(event) => setNewMDP(event.target.value)} />
                                            <input
                                                type={voirC ? "text" : "password"}
                                                name='repeteMDP'
                                                id='repeteMDP'
                                                value={repeteMDP}
                                                // pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[^\w\s?!/\^$=+*:]))[A-Za-z\d^\w\s?!/\^$=+*:]{10,50}$"
                                                onChange={(event) => setRepeteMDP(event.target.value)} />
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
                                        <label>Téléphone : </label>
                                        <label htmlFor="phone">Nouveau numéro : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {utilisateur && utilisateur.phone ? (<span className={monProfil.pUtilisateur}>{utilisateur.phone}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                                        <input
                                            type="number"
                                            name='phone'
                                            id='phone'
                                            onChange={handleChange} />
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
                                            onChange={handleChange} />
                                        <input
                                            className={monProfil.inputsSepare}
                                            type="number"
                                            name='postal'
                                            id='postal'
                                            value={utilisateur?.postal || ""}
                                            onChange={handleChange} />
                                        <input
                                            type="text"
                                            name='town'
                                            id='town'
                                            value={utilisateur?.town || ""}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className={monProfil.contientBtn}>
                                    <button className={monProfil.btnEnvoi}>Enregistrer les modifications</button>
                                </div>
                            </form>
                            <div className={monProfil.contientBtn2}>
                                <button className={monProfil.btnSuppression} onClick={() => { deleteUser(auth._id)}}>Supprimer mon compte</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default MonProfil