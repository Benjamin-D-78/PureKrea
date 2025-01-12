import React from 'react'
import { useParams } from 'react-router-dom'
import confirmation from "./confirmation.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

const Confirmation = () => {

    const { id } = useParams();

    return (
        <div>
            <NavBar />
            <div className={confirmation.divContientConfirmation}>
                <div className={confirmation.confirmationCommande}>
                    <h1>Merci pour votre commande !</h1>
                    <p>Nous avons bien reçu votre demande et nous sommes heureux de vous confirmer qu'elle a été enregistrée avec succès.</p>
                    <p>Comme mentionné dans nos CGV, nous nous engageons à expédier vos articles sous 48h à 72h.</p>
                    <p>Retrouvez toutes vos commandes en cliquant <a className={confirmation.a} href="">ici</a></p>
                    <p>Vous avez des questions concernant ou des rectifications à apporter sur votre commande ? <br />
                        Contactez-nous <a className={confirmation.a} href="">ici</a> en précisant la commande :</p>
                    <p className={confirmation.numCommande}>N° {id}</p>
                    <p>Nous traiterons votre réclamation sous 24h.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Confirmation