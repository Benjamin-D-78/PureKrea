import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"

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
import mesCommandes from "./mesCommandes.module.css"

const MesCommandes = () => {

    const {auth} = useContext(AuthContext)
    console.log(auth)

    const [commandes, setCommandes] = useState([]);
    const { id } = useParams();
    console.log(id)

    // const token = localStorage.getItem("auth_token");

    useEffect(() => {
        console.log(id)
        const userAuth = localStorage.getItem("auth");
        const auth = userAuth && JSON.parse(userAuth);

        if (auth) {
            const commandesByUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/commande/obtenir/commandes/${id}`, { withCredentials: true })
                    console.log(response.data)
                    setCommandes(response.data)
                } catch (error) {
                    console.error("Erreur lors de la recherche des commandes", error.message)
                }

            };

            commandesByUser();
        }
    }, [id])

    return (
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Mes commandes</h1>

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
                    <div className={commande.conteneurD}>
                        <div className={commande.conteneurGeneralRecap}>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MesCommandes