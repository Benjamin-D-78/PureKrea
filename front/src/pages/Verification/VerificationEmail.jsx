import { React, useState, useEffect } from 'react'
import axios from "axios"
import { useParams, Link } from "react-router-dom";

const VerificationEmail = () => {

    const [message, setMessage] = useState([]);
    const { token } = useParams();

    // useEffect, c'est comme dire "fais ça dès que la page est chargée"
    useEffect(() => {
        // On créé une fonction qui va mettre à jour le statut de vérification.
        const updateVerification = async () => {
            try {
                // On envoie la requête au serveur pour vérifier l'email
                const { data } = await axios.put(`http://localhost:8000/api/user/verification/${token}`)
                setMessage(data.message);
            } catch ({ response }) {
                const { message } = response.data;
                setMessage(message);
            }
        }
        updateVerification();
    }, [])
    return (
        <div>
            <h1>Verify Email</h1>
            {/* On affiche notre message s'il existe */}
            <p>{message && message}</p>
            <Link to='/connexion'>Se connecter</Link>
        </div>
    )
}

export default VerificationEmail