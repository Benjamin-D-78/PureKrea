import { React, useContext } from 'react'
import axios from "axios"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useNavigate } from "react-router-dom"
import { PanierContext } from '../context/PanierContext'
import paiementCSS from "./paiement.module.css"

const TestFormulaire = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { idCommande } = useContext(PanierContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // on créé ici une méthode de paiement
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement), // On récupère cette méthode de paiement avec le getElement
        });
        if (!error) {
            console.log("Token généré : ", paymentMethod) // On génère grâce à paymentMethod un paiement qui sera en fait un Token. Ce token sera à envoyer au backend pour réaliser le paiement.
            // envoi du token au back :
            try {
                const { id } = paymentMethod;
                const response = await axios.post("http://localhost:8000/api/paiement/chargement", {
                    montant: 100,
                    id: id
                })
                if (response.data.success) {
                    console.log("Paiement réussi ! Bien joué !")
                    navigate(`/commande/confirmation/${idCommande}`)
                }
            } catch (error) {
                console.log("Erreur : ", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{ hidePostalCode: true }} />
                    <button className='mt-5 ms-5 '>Payer</button>
                </form>
            </div>
        </div>
    )
}

export default TestFormulaire