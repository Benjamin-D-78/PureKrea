import React from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom"
import navbar from "./navbar.module.css"
import logo from "../../images/NavBar/logo.png"
import hamburger from "../../images/NavBar/hamburger.svg"
import close from "../../images/NavBar/close.svg"

export default function NavBar() {

    const [montrerMenu, setMontrerMenu] = useState(false)

    return (
        <div>
            <header>
                <nav className={navbar.nav}>
                    <div className={navbar.divImage}>
                        <NavLink to="/"><img className={navbar.img} src={logo} alt="Logo 'PureKréNavLink'" />
                        </NavLink>
                    </div>
                    <div className={`${montrerMenu ? navbar.montre : navbar.cache}`}>
                        <ul className={navbar.ul}>
                            <li className={navbar.navbarLI}>
                                <NavLink className={navbar.a} to="/nousconnaitre">Nous connaître</NavLink>
                            </li>
                            <li className={navbar.navbarLI}>
                                <NavLink className={navbar.a} to="/boutique">Boutique</NavLink>
                            </li>
                            <li className={navbar.navbarLI}>
                                <NavLink className={navbar.a} to="/rendez-vous">Prendre rendez-vous</NavLink>
                            </li>
                            <li className={navbar.navbarLI}>
                                <NavLink className={navbar.a} to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                    <img 
                        onClick={() => setMontrerMenu(!montrerMenu)}
                        className={`${montrerMenu ? navbar.menuClose : navbar.menuBurger}`}
                        src={montrerMenu ? close : hamburger}
                        alt="Menu Hamburger" />
                </nav>
            </header>
            <hr className={navbar.hr} />
        </div>
    )
}
