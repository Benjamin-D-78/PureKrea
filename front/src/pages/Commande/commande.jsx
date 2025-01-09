import { React, useState, useEffect, useContext } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

// CSS
import boutique from "../Boutique/Boutique.module.css"
import commande from "./commande.module.css"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import PanierTotal from '../../components/PanierSynthèse/visuelPanier'
import ConnectezVous from '../../components/ConnectezVous/connectezVous'
import PrenezRendezVous from '../../components/PrenezRendezVous/prenezRendezVous'
import Accordeon from '../../components/Accordeon/accordeon'
import ModalCGV from '../../components/ModalCGV/ModalCGV'

// CONTEXT
import { AuthContext } from '../../context/AuthContext'
import { PanierContext } from '../../context/PanierContext'

const Commande = () => {

  const { auth } = useContext(AuthContext)
  const { incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, panier, prixTotal } = useContext(PanierContext)



  return (
    <main>
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

        <div >
          <div className={commande.blocEntete1}>
            <div className={commande.entete1}>
              <p className={commande.pName}>Récapitulatif</p>
            </div>
          </div>
          <div className={commande.conteneurD}>
            <div className={commande.conteneurGeneralRecap}>
              <p className={commande.livraisonA}>Livraison à :</p>
              <div className={commande.conteneurInfoUtilisateur}>
                <div className={commande.labelUtilisateur}>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Nom : </label>
                    {auth && auth.lastname ? (<span className={commande.pUtilisateur}>{auth.lastname}</span>) : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Prénom : </label>
                    {auth && auth.firstname ? <span className={commande.pUtilisateur}>{auth.firstname}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Adresse : </label>
                    {auth && auth.adress ? <span className={commande.pUtilisateur}>{auth.adress}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Code postal : </label>
                    {auth && auth.postal ? <span className={commande.pUtilisateur}>{auth.postal}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div>
                    <label className={commande.labelRecap} htmlFor="">Téléphone : </label>
                    {auth && auth.phone ? <span className={commande.pUtilisateur}>{auth.phone}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
                  </div>
                  <div className={commande.contientArea}>
                    <div className={commande.labelArea}><label className={commande.labelCommentaire} htmlFor="">Commentaire : </label></div>
                    <div className={commande.textArea}><textarea className={commande.areaUtilisateur} name="" id="" rows={4} cols={24}></textarea></div>
                  </div>
                  <div className={commande.contientBtnMInfo}>
                    <Link><button className={commande.btnModifierInformations}>Modifier mes informations</button></Link>
                  </div>
                </div>
              </div>
              <hr className={commande.hrCommande} />
              <p className={commande.livraisonA}>Récapitulatif d'achat(s) :</p>
              <div className={commande.conteneurInfoUtilisateur}>


                <div className={commande.synthesePanier}>
                  <p className={commande.pNomArticle}>Référence</p>
                  <p className={commande.pLargeur}>Largeur</p>
                  <p className={commande.pU}>P/U</p>
                  <p className={commande.pQte}>Quantité</p>
                  <p className={commande.pPrix}>Total</p>
                </div>

                {panier.map((article, index) => (
                  <div key={index} className={commande.detailsPanier}>
                    <p className={commande.nomArticle}>{article.name}</p>
                    <p className={commande.largeurArticle}>{article.width} cm</p>
                    <p className={commande.quantiteU}>{article.price} €</p>
                    <p className={commande.quantiteArticle}>{article.quantite}</p>
                    <p className={commande.prixArticle}>{prixParQuantite(article.price, article.quantite)} €</p>
                  </div>
                ))}
              </div>
              <div className={commande.totalRecap}>
                <p className={commande.quantiteTotalRecap}>{totalArticle()}</p>
                <p className={commande.prixTotalRecap}>{prixTotal} €</p>
              </div>
              <div>
                <div className={commande.divConteneurCheckBox}>
                  <div className={commande.contientCheckbox}>
                    <input
                      className={commande.checkboxCommande}
                      type='checkbox'
                      required>
                    </input>
                  </div>
                    <p className={commande.pCGV}>En cochant cette case vous acceptez nos <ModalCGV/></p>
                    
                </div>
              </div>
              <div className={commande.contientBtnValidation1}>
                <button className={commande.btnValidation1}>Valider la commande</button>
              </div>
              <div className={commande.contientBtnValidation2}>
                <Link to={{ pathname: "/" }}><button className={commande.btnValidation2}>Revenir au panier</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Commande