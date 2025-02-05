import { React, useEffect } from 'react'

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'


const PrendreRendezVous = () => {
    useEffect(() => {
        // Ajouter le script de Calendly au chargement du composant
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        // Nettoyage du script lorsqu'on démonte le composant
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <NavBar />
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/desmonet-idf/30min"
                style={{ minWidth: "320px", height: "700px" }}
            />
            <Footer />
        </div>
    );
};



export default PrendreRendezVous