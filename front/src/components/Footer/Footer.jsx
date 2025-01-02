import React from 'react'
import { Link, NavLink } from "react-router-dom"
import footerCSS from "./footer.module.css"
import linkedin from "../../images/Reseaux/linkedin.png"
import github from "../../images/Reseaux/github.png"


export default function Footer() {
  return (
    <footer>
      {/* Bloc gauche */}
      <div className={footerCSS.gauche}>
        <div>
          <p className={footerCSS.pGauche}>Suivez-nous</p>
        </div>
        <div className={footerCSS.contientReseaux}>
          <Link href="www.linkedin.com/in/78600-benjamin-d"><img className={footerCSS.lg} src={linkedin} alt="Logo Linkedin" /></Link>
          <Link href="https://github.com/Benjamin-D-78"><img className={footerCSS.lg} src={github} alt="Logo Linkedin" /></Link>
        </div>
      </div>
      {/* Bloc centre */}
      <div className={footerCSS.centre}>
        <div>
          <p className={footerCSS.pCentre}>Newsletter</p>
        </div>
        <div className={footerCSS.contientTexteEtForm}>
          <div className={footerCSS.divTexteNewsletter}>
            <p className={footerCSS.pTexteNewsletter}>Abonnez-vous pour recevoir toutes nos actualités et offres exclusives !</p>
          </div>
          <div className={footerCSS.divFormNewsletter}>
            <form>
              <div className={footerCSS.divFormNewsletterH}>
                <input className={footerCSS.inputFormNewsletterH} placeholder='Nom' type="text" id='nom' name='nom' required />
                <input className={footerCSS.inputFormNewsletterH} placeholder='Prénom' type="text" id='prenom' name='prenom' required />
              </div>
              <div className={footerCSS.divFormNewsletterB}>
                <input className={footerCSS.inputFormNewsletterB} placeholder='E-mail' type="email" id='email' name='email' required />
                <button className={footerCSS.btnEnvoiFormNewsletter}>Je m'abonne</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Bloc droite */}
      <div className={footerCSS.droite}>
        <div><p className={footerCSS.texteH}>PureKréa - Artisan cravatier français - Images libres de droits <br />Site Projet 2024</p></div>
        <div className={footerCSS.texteC}>
          <nav>
            <ul>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA}>Boutique</NavLink>
              </li>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA}>Nous connaître</NavLink>
              </li>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA}>Prendre rendez-vous</NavLink>
              </li>
              <li className={footerCSS.footerLI}>
                <NavLink className={footerCSS.footerA}>Contact</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div><p className={footerCSS.texteB}>En savoir plus sur les cookies et mentions légales de PureKréa</p></div>
      </div>
    </footer>
  )
}
