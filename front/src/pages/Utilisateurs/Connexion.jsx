import React from 'react'
import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import coin from "./coin.module.css"

const Connexion = () => {

  const [user, setUser] = useState({});
  const { dataFormConnexion } = useContext(AuthContext);

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault();
    dataFormConnexion(user) // On appelle Context
  }

  return (
    <>
      <NavBar />
      <div className={coin.divContainerCo}>
        <div className={coin.boxCo1}>
          <div className={coin.formCo}>
            <h1 className={coin.titreCoIn}>Connexion</h1>
            <form onSubmit={handleSubmit}>
              <label className={coin.labelCoIn} htmlFor="email">E-mail <span>*</span></label>
              <input
                type="email"
                name='email'
                id='email'
                className={coin.inputCoIn}
                onChange={handleChange} />
              <label className={coin.labelCoIn} htmlFor="password">Mot de passe <span>*</span></label>
              <input
                type="password"
                name='password'
                id='password'
                className={coin.inputCoIn}
                onChange={handleChange} />
              <button className={coin.submitCoIn}>Me connecter</button>
              <Link className={coin.inscription} to="/inscription">Pas encore inscrit ?</Link>
            </form>
          </div>
        </div>
        <div className={coin.boxCoIn2}>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Connexion