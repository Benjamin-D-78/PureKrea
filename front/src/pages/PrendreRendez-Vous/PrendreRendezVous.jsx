import { React, useEffect } from 'react'

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


const PrendreRendezVous = () => {
    useEffect(() => {
        // On créé ici un script dynamiquement avec createElement
        const script = document.createElement('script');
        // On importe le fichier JS externe de calendly
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true; // Le reste du code de la page s'exécute pendant que ça charge
        document.body.appendChild(script); // Le script est ajouté au body de la pahe HTML

        return () => {
            // Le script se "démonte" lorsque je changerai de page.
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <NavBar />

        <Footer/>
        </div >
    );
};



export default PrendreRendezVous