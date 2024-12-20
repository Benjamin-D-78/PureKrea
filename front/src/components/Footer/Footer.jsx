import React from 'react'
import { Link } from "react-router-dom"
import footerCSS from "./footer.module.css"
import classNames from "classnames"
import linkedin from "../../images/Reseaux/linkedin.png"
import github from "../../images/Reseaux/github.png"


export default function Footer() {
  return (
    <div className={footerCSS.footerGlobal}>
      <footer>
        <div className={footerCSS.footerContient}>
          <div className={footerCSS.gauche}>
            <div>
              <p className={footerCSS.pGauche}>Suivez-nous</p>
            </div>
            <div className={footerCSS.contientReseaux}>
              <div className={footerCSS.reseaux}>
                <Link href="www.linkedin.com/in/78600-benjamin-d"><img className={footerCSS.lg} src={linkedin} alt="Logo Linkedin" /></Link>
                <Link href="https://github.com/Benjamin-D-78"><img className={footerCSS.lg} src={github} alt="Logo Linkedin" /></Link>
              </div>
            </div>
          </div>
          <div className={classNames(footerCSS.center, footerCSS.boxCentre)}>
            <p className={footerCSS.pCentre}>Newsletter</p>
            <div className={footerCSS.gcdContient}>
              <div className='texte-newsletter'>
                <p></p>
              </div>
              <div className='form-newsletter'>
                <form action="">
                  <input type="text" id='nom' name='nom' required />
                  <input type="text" id='prenom' name='prenom' required />
                  <input type="email" id='email' name='email' required />
                  <button>Je m'abonne</button>
                </form>
              </div>
            </div>
          </div>
          <div className={footerCSS.droite}>
            <div className='texte-haut'><p>PureKréa - Artisan cravatier français - Images libres de droits <br />Site Projet 2024</p></div>
            <div className='texte-gauche'></div>
            <div className='texte-droite'></div>
            <div className='texte-bas'></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
