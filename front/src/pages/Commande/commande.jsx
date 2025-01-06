import { React, useState, useEffect, useContext } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "./commande.module.css"
import detailsCSS from "../Details/details.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import PanierTotal from '../../components/PanierSynthèse/visuelPanier'
import ConnectezVous from '../../components/ConnectezVous/connectezVous'
import PrenezRendezVous from '../../components/PrenezRendezVous/prenezRendezVous'
import Accordeon from '../../components/Accordeon/accordeon'

// CONTEXT
import { AuthContext } from '../../context/AuthContext'
import { PanierContext } from '../../context/PanierContext'

const Commande = () => {

  const { auth } = useContext(AuthContext)
  const { incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, panier, prixTotal } = useContext(PanierContext)

  return (
    <div>
      <NavBar />
      <h1 className={boutique.h1Boutique}>Commande</h1>

      <div className={commande.conteneurGlobal}>
        <div className={commande.conteneurG}>
          {auth ? <PanierTotal /> : <ConnectezVous />}
          <PrenezRendezVous />

          <div className={boutique.accordeon}>
            <p className={boutique.pOnVousDitTout}>On vous dit tout</p>
            <Accordeon
              titre="D'où viennent nos soies ?"
              corps={<>Toutes nos soies proviennent de chenilles du bombyx du mûrier et sont élevées à proximité de champs de mûres.<br /> (Origine : Asie, 80% en provenance de la Chine).</>} />
            <Accordeon
              titre="Quel budget faut-il prévoir ?"
              corps={<>Nos prix varient en fonction des modes de tissages pratiqués. Un investissement supplémentaire est à prévoir pour une cravate sur-mesure.<br /> Celui-ci se calcule par rapport au temps consacré à sa confection.
                En moyenne, une cravate sur-mesure a un tarif global entre 250 et 400 euros.</>} />
            <Accordeon
              titre="Quel est le délai de fabrication ?"
              corps="Il faut compter 2 mois de délais pour la réalisation d'une cravate sur-mesure, et 2 semaines supplémentaires en cas de retouches éventuelles." />
            <Accordeon
              titre="Quelles sont nos limites en sur-mesure ?"
              corps="Nous n'en avons pas à proprement parler. Nos limites sont les vôtres. Néanmoins nous n'acceptons pas les demandent trop marginales et pouvant offenser autrui." />
            <Accordeon
              titre="Un rendez-vous est-il obligatoire ?"
              corps="Oui, un rendez-vous minimum est obligatoire. Il est la certitude que nous répondrons pleinement à vos attentes. Vous pourrez à cette occasion nous poser toutes vos questions, et nous de même." />
            <Accordeon
              titre="Quelle est notre politique de retour ?"
              corps={<>En sur-mesure, il n'y en a pas. La prise de rendez-vous est nécessaire et conçue pour éviter ce désagrément.<br />Pour le prêt-à-porter, vous disposez d'un délai d'une semaine pour nous retourner le ou les articles à compter de leur réception.</>} />
          </div>
        </div>
        <div className={detailsCSS.blocEntete1}>
          <div className={detailsCSS.entete1}>
            <h2 className={detailsCSS.pName}>Récapitulatif</h2>
          </div>
        </div>
        <div className={commande.conteneurD}>
          <div className={commande.conteneurGeneralRecap}>
            <p>Livraison à {auth ? `${auth.firstname} ${auth.lastname}` : ""}</p>
            <div className={commande.conteneurInfoUtilisateur}>
                <div className={commande.labelUtilisateur}>
                  <label htmlFor="">Adresse : </label>
                  <label htmlFor="">Code postal : </label>
                  <label htmlFor="">Téléphone : </label>
                  <label htmlFor="">Commentaire : </label>
                </div>
                <div className={commande.inputUtilisateur}>
                  {auth && auth.adress ? `${auth.adress}` : <input type="text" required />}
                  {auth && auth.postal ? `${auth.postal}` : <input type="number" required />}
                  {auth && auth.phone ? `${auth.phone}` : <input type="number" required />}
                  <textarea name="" id="" rows={4} cols={20}></textarea>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Commande