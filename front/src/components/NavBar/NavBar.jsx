import React from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom"
import style from "./navbar.module.css"
import logo from "../../images/NavBar/logo.png"
// import hamburger from "../images/NavBar/hamburger.jpg"
// import close from "../images/NavBar/close.jpg"

export default function NavBar() {

    const [montrerMenu, setMontrerMenu] = useState(false)

    return (
        <header>
            <nav className={style.nav}>
                <ul className={style.ul}>
                    <li>
                        <NavLink className={style.a} to="/"><img className={style.img} src={logo} alt="Logo 'PureKréNavLink'" /></NavLink>
                    </li>
                    <li>
                        <NavLink className={style.a} to="/nousconnaitre">Nous connaître</NavLink>
                    </li>
                    <li>
                        <NavLink className={style.a} to="/boutique">Boutique</NavLink>
                    </li>
                    <li>
                        <NavLink className={style.a} to="/rendez-vous">Prendre rendez-vous</NavLink>
                    </li>
                    <li>
                        <NavLink className={style.a} to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
