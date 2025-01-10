import React from 'react'
import { useState, useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { PanierContext } from '../../context/PanierContext'
import navbar from "./navbar.module.css"
import logo from "../../images/NavBar/logo.png"
import hamburger from "../../images/NavBar/hamburger.svg"
import close from "../../images/NavBar/close.svg"

export default function NavBar() {

    const { auth, deconnexion } = useContext(AuthContext)
    const { videPanier } = useContext(PanierContext)
    const [montrerMenu, setMontrerMenu] = useState(false)

    const deconnexionTotale = () => {
        videPanier();
        deconnexion();
    }

    return (
        <div>
            <header>
                <nav className={navbar.nav}>
                        <div className={navbar.divImage}>
                            <NavLink to="/"><img className={navbar.img} src={logo} alt="Logo 'PureKréNavLink'" />
                            </NavLink>
                        </div>
                        <div className={navbar.navContainer}>
                        <div className={`${montrerMenu ? navbar.montre : navbar.cache}`}>
                            <ul className={navbar.ul}>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/">Boutique</NavLink>
                                </li>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/nous-connaitre">Nous connaître</NavLink>
                                </li>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/rendez-vous">Prendre rendez-vous</NavLink>
                                </li>
                                <li className={navbar.navbarLI}>
                                    <NavLink className={navbar.a} to="/contact">Contact</NavLink>
                                </li>
                                <li className={navbar.navbarLI}>
                                    {auth ?
                                        <NavLink onClick={deconnexionTotale} className={navbar.a} to="/connexion">Déconnexion</NavLink> :
                                        <NavLink className={navbar.a} to="/connexion">Connexion</NavLink>}
                                </li>
                            </ul>
                        </div>
                        <img
                            onClick={() => setMontrerMenu(!montrerMenu)}
                            className={`${montrerMenu ? navbar.menuClose : navbar.menuBurger}`}
                            src={montrerMenu ? close : hamburger}
                            alt="Menu Hamburger" />
                    </div>
                </nav>
            </header>
            <hr className={navbar.hr} />
        </div>
    )
}
