import React from 'react'
import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import NavBar from '../../components/NavBar/NavBar'

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
    <div>
      <NavBar />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail <span>*</span></label>
          <input
            type="email"
            name='email'
            id='email'
            onChange={handleChange} />
          <label htmlFor="password">Mot de passe <span>*</span></label>
          <input
            type="password"
            name='password'
            id='password'
            onChange={handleChange} />

          <button>Me connecter</button>
          <Link to="/inscription">Pas encore inscrit ?</Link>
        </form>
      </div>
    </div>
  )
}

export default Connexion