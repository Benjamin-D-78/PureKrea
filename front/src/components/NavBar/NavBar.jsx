import React from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom"
import "./navbar.module.css"
import logo from "../../images/NavBar/logo.jpg"
// import hamburger from "../images/NavBar/hamburger.jpg"
// import close from "../images/NavBar/close.jpg"

export default function NavBar() {

    const [montrerMenu, setMontrerMenu] = useState(false)

    return (
        <header>
            <nav>
                <ul className={`${montrerMenu ? "flex" : "hidden"} flex-col items-center bg-slate-200 w-full absolute top-full pb-5 sm:flex sm:relative sm:flex-row sm:pb-0 justify-center`} >
                    <li>
                        <NavLink to="#"><img src={logo} alt="Logo 'PureKréNavLink'" /></NavLink>
                    </li>
                    <li>
                        <NavLink to="">Nous connaître</NavLink>
                    </li>
                    <li>
                        <NavLink to="">Boutique</NavLink>
                    </li>
                    <li>
                        <NavLink to="">Prendre rendez-vous</NavLink>
                    </li>
                    <li>
                        <NavLink to="">Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
