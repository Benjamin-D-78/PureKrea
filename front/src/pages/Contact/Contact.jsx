import { React, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"

// RACCOURCIS
import { URL } from '../../utils/Constantes'

// ICONES
import telephone from "../../images/Icones/telephone.png"

// CSS
import boutique from "../Boutique/Boutique.module.css"
import contact from "./contact.module.css"
import commande from "../Commande/commande.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import Accordeon from '../../components/Accordeon/accordeon'


const Contact = () => {

    const [message, setMessage] = useState({
        motif: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        content: "",
        verification: false,
        preference: ""
    })

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        // On utilise prevState comme pour dire qu'on utilise le state le plus récent.
        if (type === "checkbox") {
            setMessage((prevState) => ({ ...prevState, [name]: checked }))
        } else {
            setMessage((prevState) => ({ ...prevState, [name]: value }))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!message.motif || !message.firstname || !message.lastname || !message.email || !message.content){
            toast.error("Certains des champs obligatoires sont vides.")
            return;
        }

        if(!message.verification){
            toast.error("Vous devez acceptez d'être recontacté pour envoyer votre message.")
            return;
        }

        try {
            const response = await axios.post(URL.MESSAGE_CREATION, message)
            console.log(response.data)
            toast.success("Message envoyé avec succès.", { autoClose: 1000 })

            setMessage({
                motif: "",
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                content: "",
                verification: false,
                preference: ""
            })

        } catch (error) {
            console.error("Echec de l'envoi du message : ", error.message)
            toast.error("Echec de l'envoi du message.", { autoClose: 3000 })
        }
    }

    return (
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Contact</h1>
            <div className={commande.conteneurGlobal}>
                <div className={commande.conteneurG}>
                    <div className={contact.informationsContact}>
                        <h2 className={contact.h2Contact}>Vous accueillir</h2>
                        <div className={contact.divHoraire}>
                            <p>Du lundi au vendredi :</p>
                            <ul className={contact.ulContact}>
                                <li>9h à 11h30</li>
                                <li>15h à 17h30</li>
                            </ul>
                            <hr className={contact.hrContact} />
                            <h2 className={contact.h2ContactBis}>PureKréa</h2>
                            <h3 className={contact.h3Contact}>Artisan cravatier</h3>
                            <ul className={contact.ulContact}>
                                <li>Place d'Arme</li>
                                <li>78000 VERSAILLES</li>
                            </ul>
                        </div>
                    </div>
                    <Accordeon />
                </div>

                <div>
                    <div className={boutique.blocEntete1}>
                        <div className={contact.entete1}>
                            <p className={contact.pStock}>Contactez-nous</p>
                            <p className={contact.pStock}>|</p>
                            <div className={contact.contientInfoPhone}>
                                <div className={contact.contientPhone}>
                                    <img src={telephone} alt="icone de téléphone" />
                                </div>
                                <p className={contact.pStock}>01 70 70 70 70</p>
                            </div>
                        </div>
                    </div>
                    <div className={contact.conteneurD}>
                        <div className={contact.contientFormulaire}>
                            <h4 className={contact.h4Contact}>Formulaire</h4>
                            <form onSubmit={handleSubmit}>
                                <div className={contact.contientMotif}>
                                    <label htmlFor="motif">Votre demande concerne <span className={contact.span}>*</span></label>
                                    <select name='motif' value={message.motif} onChange={handleChange}>
                                        <option></option>
                                        <option value="Le service sur-mesure">Le service sur-mesure</option>
                                        <option value="Une erreur dans une commande">Une erreur dans une commande</option>
                                        <option value="Une réclamation">Une réclamation</option>
                                        <option value="Une question">Une question</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                                <div className={contact.premiereLigne}>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="lastname">Nom <span className={contact.span}>*</span></label>
                                        <input
                                            type="text"
                                            name='lastname'
                                            value={message.lastname}
                                            onChange={handleChange} />
                                    </div>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="firstname">Prénom <span className={contact.span}>*</span></label>
                                        <input
                                            type="text"
                                            name='firstname'
                                            value={message.firstname}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className={contact.premiereLigne}>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="email">Email <span className={contact.span}>*</span></label>
                                        <input
                                            type="text"
                                            name='email'
                                            value={message.email}
                                            onChange={handleChange} />
                                    </div>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="phone">Téléphone</label>
                                        <input
                                            type="text"
                                            name='phone'
                                            value={message.phone}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className={contact.contientLabelInputArea}>
                                    <label htmlFor="content">Commentaire <span className={contact.span}>*</span></label>
                                    <textarea
                                        name="content"
                                        id='content'
                                        className={contact.textarea}
                                        value={message.content}
                                        onChange={handleChange}>
                                    </textarea>
                                </div>
                                <div className={contact.contientLabelInputRadio}>
                                    <div>
                                        <label htmlFor="preference">Préférence de contact</label>
                                        <div>
                                            <input
                                                type="radio"
                                                name='preference'
                                                value="Matin"
                                                checked={message.preference === 'Matin'}
                                                onChange={handleChange} />
                                            <p>Matin</p>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name='preference'
                                                value="Après-midi"
                                                checked={message.preference === 'Après-midi'}
                                                onChange={handleChange} />
                                            <p>Après-midi</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={contact.contientConfirmation}>
                                    <div className={contact.contientinput}>
                                        <input
                                            type="checkbox"
                                            name='verification'
                                            checked={message.verification}
                                            onChange={handleChange} />
                                    </div>
                                    <p>En cochant cette case, vous acceptez d'être recontacté(e) dans le cadre de votre demande.</p>
                                </div>
                                <div className={contact.contientBtnValidation}>
                                    <button
                                        className={contact.btnValidation}>Envoyer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Contact