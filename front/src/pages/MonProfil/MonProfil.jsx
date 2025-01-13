import { React, useContext } from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';

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

    const { auth, setAuth } = useContext(AuthContext);

    const [ancienMDP, setAncienMDP] = useState("");
    const [newMDP, setNewMDP] = useState("");
    const [repeteMDP, setRepeteMDP] = useState("");

    const [utilisateur, setUtilisateur] = useState({
        // Obligé de demander si les valeurs sont là sinon je suis embêté par l'erreur des input incontrôllés.
        lastname: auth?.lastname || "",
        firstname: auth?.firstname || "",
        email: auth?.email || "",
        password: auth?.password || "",
        phone: auth?.phone || "",
        adress: auth?.adress || "",
        postal: auth?.postal || "",
        town: auth?.town || ""
    });


    useEffect(() => {
        if (auth) {
            setUtilisateur({
                lastname: auth.lastname,
                firstname: auth.firstname,
                email: auth.email,
                password: auth.password,
                phone: auth.phone,
                adress: auth.adress,
                postal: auth.postal,
                town: auth.town
            })
        }
    }, [auth])



    const handleChange = (event) => {
        const { name, value } = event.target
        setUtilisateur(prev => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // On vérifie les MDP
        if (newMDP !== repeteMDP) {
            toast.error("Les mots de passe ne sont pas identiques.", { autoClose: 2000 });
            return;
        }

        // On créé l'objet "updateUser"
        const updateUser = { ...utilisateur };

        // On ajoute le MDP seulement si un nouveau a été renseigné.
        if (newMDP) {
            updateUser.password = newMDP;
            updateUser.ancienMDP = ancienMDP
        }

        const userAuth = localStorage.getItem("auth");
        const auth = userAuth && JSON.parse(userAuth)

        if (auth)
            try {
                const response = await axios.put(`http://localhost:8000/api/user/update/${auth._id}`, updateUser, { withCredentials: true, }
                );
                if (response.status === 200) {
                    setAuth(response.data)
                    toast.success("Profil mis à jour avec succès.", { autoClose: 1000 })
                } else {
                    toast.error("Une erreur s'est produite lors de la mise à jour des informations.", { autoClose: 3000 });
                }
            } catch (error) {
                console.error("type d'erreur: ", error)
                toast.error("Erreur lors de la mise à jour des informations.", { autoClose: 3000 })
            }
    }


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
                                        {auth && auth.lastname ? (<span className={monProfil.pUtilisateur}>{auth.lastname}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='lastname'
                                            id='lastname'
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Prénom : </label>
                                        <label htmlFor="firstname">Nouveau prénom : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {auth && auth.firstname ? (<span className={monProfil.pUtilisateur}>{auth.firstname}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='firstname'
                                            id='firstname'
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Email : </label>
                                        <label htmlFor="email">Nouveau mail : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {auth && auth.email ? (<span className={monProfil.pUtilisateur}>{auth.email}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                                        <input
                                            type="text"
                                            name='email'
                                            id='email'
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label className={monProfil.labelsSepare} htmlFor="ancienMDP">Mot de passe actuel : </label>
                                        <label className={monProfil.labelsSepare} htmlFor="newMDP">Nouveau mot de passe : </label>
                                        <label htmlFor="repeteMDP">Répétez le mot de passe : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        <input
                                            className={monProfil.inputsSepare}
                                            type="password"
                                            name='ancienMDP'
                                            id='ancienMDP'
                                            value={ancienMDP}
                                            onChange={(event) => setAncienMDP(event.target.value)} />
                                        <input
                                            className={monProfil.inputsSepare}
                                            type="password"
                                            name='newMDP'
                                            id='newMDP'
                                            value={newMDP}
                                            onChange={(event) => setNewMDP(event.target.value)} />
                                        <input
                                            type="password"
                                            name='repeteMDP'
                                            id='repeteMDP'
                                            value={repeteMDP}
                                            onChange={(event) => setRepeteMDP(event.target.value)} />
                                    </div>
                                </div>
                                <hr className={monProfil.hr} />

                                <div className={monProfil.contientDonnees}>
                                    <div className={monProfil.labelsProfil}>
                                        <label>Téléphone : </label>
                                        <label htmlFor="phone">Nouveau numéro : </label>
                                    </div>
                                    <div className={monProfil.inputsProfil}>
                                        {auth && auth.phone ? (<span className={monProfil.pUtilisateur}>{auth.phone}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
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
                                            value={auth?.adress || ""}
                                            onChange={handleChange} />
                                        <input
                                            className={monProfil.inputsSepare}
                                            type="number"
                                            name='postal'
                                            id='postal'
                                            value={auth?.postal || ""}
                                            onChange={handleChange} />
                                        <input
                                            type="text"
                                            name='town'
                                            id='town'
                                            value={auth?.town || ""}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className={monProfil.contientBtn}>
                                    <button className={monProfil.btnEnvoi}>Enregistrer les modifications</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default MonProfil