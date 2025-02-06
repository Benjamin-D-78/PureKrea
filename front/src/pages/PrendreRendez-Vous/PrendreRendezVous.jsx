import { React, useEffect } from 'react'
import rdv from "./prendrerdv.module.css"

// CSS
import commande from "../Commande/commande.module.css"
import boutique from "../Boutique/Boutique.module.css"
import contact from "../Contact/contact.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import Accordeon from '../../components/Accordeon/accordeon'

// ICONES
import telephone from "../../images/Icones/telephone.png"
import ciseaux from "../../images/Sur-mesure.png"


const PrendreRendezVous = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <NavBar />
            <h1 className={rdv.h1}>Prendre rendez-vous</h1>
            <div className={rdv.conteneur}>
                <div>
                    <div className={rdv.divImg}>
                        <img src={ciseaux} alt="prise de rendez-vous" />
                        <a
                            href="https://calendly.com/desmonet-idf/creons-votre-cravate"
                            className="acuity-embed-button"
                            target="_blank"
                            rel="noopener noreferrer">
                            <button className={rdv.button}>Prendre rendez-vous</button>
                        </a>
                    </div>
                    <div className={rdv.divBtn}>
                        <a
                            href="https://calendly.com/desmonet-idf/creons-votre-cravate"
                            className="acuity-embed-button"
                            target="_blank"
                            rel="noopener noreferrer">
                            <button className={rdv.button}>Prendre rendez-vous</button>
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};



export default PrendreRendezVous