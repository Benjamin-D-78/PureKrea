import React from 'react'

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
                            <form>
                                <div className={contact.contientMotif}>
                                    <label htmlFor="motif">Votre demande concerne <span>*</span></label>
                                    <select>
                                        <option>Le service sur-mesure</option>
                                        <option>Une erreur dans une commande</option>
                                        <option>Une réclamation</option>
                                        <option>Une question</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                                <div className={contact.premiereLigne}>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="lastname">Nom <span>*</span></label>
                                        <input type="text" />
                                    </div>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="lastname">Prénom <span>*</span></label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className={contact.premiereLigne}>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="email">Email <span>*</span></label>
                                        <input type="text" />
                                    </div>
                                    <div className={contact.contientLabelInput}>
                                        <label htmlFor="phone">Téléphone</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className={contact.contientLabelInputArea}>
                                    <label htmlFor="comment">Commentaire <span>*</span></label>
                                    <textarea name="comment" id='comment' className={contact.textarea}></textarea>
                                </div>
                                <div className={contact.contientLabelInputRadio}>
                                    <div>
                                        <label htmlFor="lastname">Préférence de contact</label>
                                        <div>
                                            <input type="radio" />
                                            <p>Matin</p>
                                        </div>
                                        <div>
                                            <input type="radio" />
                                            <p>Après-midi</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={contact.contientConfirmation}>
                                    <div className={contact.contientinput}>
                                        <input type="checkbox" />
                                    </div>
                                    <p>En cochant cette case, vous acceptez d'être recontacté(e) dans le cadre de votre demande.</p>
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