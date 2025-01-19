import { React, useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { toast } from 'react-toastify'
import coin from "./coin.module.css"

// ICONES
import voir from "../../images/Icones/voir.svg"

// COMPOSANTS
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'


const Connexion = () => {

  const [user, setUser] = useState({});
  const { dataFormConnexion } = useContext(AuthContext);
  const [voirA, setVoirA] = useState(false)
  const [error, setError] = useState({
    email: "",
    password: "",
  })



  const formulaire = () => {
    const messageError = {};
    let isValid = true;

    const emailRegexr = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (user.email && !emailRegexr.test(user.email)) {
      messageError.email = "Format email, entre 10 et 60 caractères attendus."
      isValid = false;
    }
    const passwordRegexr = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$/;
    if (user.password && !passwordRegexr.test(user.password)) {
      messageError.password = "Entre 8 et 40 caractères, (au moins une minuscule, une majusculte, un chiffre et un caractère spécial)."
      isValid = false;
    }

    setError(messageError);
    return isValid;
  }



  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (!formulaire()) return;

    if (!user.email || !user.password) {
      toast.error("Veuillez remplir tous les champs", { autoClose: 3000 })
      return;
    }

    dataFormConnexion(user) // On appelle Context
  }

  return (
    <>
      <NavBar />
      <div className={coin.divContainerIn}>
        <div className={coin.boxIn1}>
          <div className={coin.formIn}>
            <h1 className={coin.titreCoIn}>Connexion</h1>
            <form onSubmit={handleSubmit} noValidate>
              <label className={coin.labelCoIn} htmlFor="email-connexion">E-mail <span className={coin.spanInscription}>*</span></label>
              <input
                type="email"
                name='email'
                id='email-connexion'
                className={coin.inputCoIn}
                onChange={handleChange}
                minLength={1}
                maxLength={60}
                pattern="^[a-zA-Z0-9._%+-]{1,50}@[a-zA-Z0-9.-]{2,30}\.[a-zA-Z]{2,4}$"
                onInput={(event) => {
                  event.target.value = event.target.value.replace(/[^a-z0-9.@_-]/g, '').toLowerCase();
                }} />
              <br />
              <label className={coin.labelCoIn} htmlFor="password-connexion">Mot de passe <span className={coin.spanInscription}>*</span></label>
              <div className={coin.contientInputImg}>
                <div className={coin.inputsMDP}>
                  <input
                    type={voirA ? "text" : "password"}
                    name='password'
                    id='password-connexion'
                    className={coin.inputCoIn}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={40}
                    pattern="^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/[^a-zA-Z0-9,;.?!\*\(\)]/g, '');
                    }} />
                  {error.password && <span className={coin.spanError}>{error.password}</span>}

                </div>
                <div className={coin.contientVoir}>
                  <img onClick={() => setVoirA(!voirA)} className={coin.voir} src={voir} alt="Icone pour voir le mot de passe indiqué" />
                </div>
              </div>
              <div className={coin.contientSubmit}>
                <button className={coin.submitCoIn}>Me connecter</button>
                <Link className={coin.inscription} to="/inscription"> <button className={coin.alternatif}>Pas encore inscrit ?</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Connexion