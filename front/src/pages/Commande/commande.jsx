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
  console.log(auth)
  const { incremente, decremente, ajouterArticle, retirerArticle, validerCommande, prixParQuantite, totalArticle, panier, prixTotal } = useContext(PanierContext)

  const [checkboxCochee, setCheckboxCochee] = useState(false)

  const handleCheckbox = () => {
    setCheckboxCochee(!checkboxCochee)
  }

  const verifieInformations = () => {
    return !(auth && auth.firstname && auth.lastname && auth.adress && auth.postal && auth.town && auth.phone)
  }

  const informationsManquantes = verifieInformations();

  return (
    <main>
      <NavBar />
      <h1 className={boutique.h1Boutique}>Commande</h1>

      <div className={commande.conteneurGlobal}>
        <div className={commande.conteneurG}>
          {auth ? <PanierTotal /> : <ConnectezVous />}
          <PrenezRendezVous />
          <Accordeon />
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
                    <label className={commande.labelRecap} htmlFor="">Ville : </label>
                    {auth && auth.town ? <span className={commande.pUtilisateur}>{auth.town}</span> : <span className={commande.manquantUtilisateur}>Information manquante</span>}
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

              <div className={commande.divContientCheckBox}>
                <div className={commande.contientCheckbox}>
                  <input
                    onChange={handleCheckbox}
                    className={commande.checkboxCommande}
                    type='checkbox'
                    required>
                  </input>
                </div>
                <div className={commande.divPCGV}>
                  <p className={commande.pCGV}>En cochant cette case vous acceptez nos</p>
                  <ModalCGV />
                </div>
              </div>

              <div className={commande.contientBtnValidation1}>
                <button
                  disabled={!checkboxCochee || informationsManquantes}
                  onClick={validerCommande}
                  className={commande.btnValidation1}>Valider la commande</button>
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