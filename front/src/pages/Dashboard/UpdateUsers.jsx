import { React, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
import items from "../Dashboard/css/items.module.css"
import { URL } from '../../utils/Constantes';

function UpdateUsers() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ancienMDP, setAncienMDP] = useState("");
  const [newMDP, setNewMDP] = useState("");
  const [repeteMDP, setRepeteMDP] = useState("");

  const [utilisateur, setUtilisateur] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    postal: "",
    town: "",
    role: "",
  });

  useEffect(() => {
    const userById = async () => {
      try {
        const response = await axios.get(`${URL.USER_BY_ID}/${id}`, { withCredentials: true })
        setUtilisateur(response.data)
      } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur.", error.message)
      }
    };
    userById();
  }, [id])


  const handleChange = (event) => {
    const { name, value } = event.target
    setUtilisateur(prev => ({ ...prev, [name]: value }))
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateUser = {};

    // if (newMDP && newMDP !== "") {
    //   if (!ancienMDP || ancienMDP === "") {
    //     toast.error("Le mot de passe actuel est requis pour changer de mot de passe.");
    //     return;
    //   }

    //   updateUser.password = newMDP;
    //   updateUser.ancienMDP = ancienMDP;
    // }

    if (utilisateur.lastname) updateUser.lastname = utilisateur.lastname
    if (utilisateur.firstname) updateUser.firstname = utilisateur.firstname
    if (utilisateur.email) updateUser.email = utilisateur.email
    if (utilisateur.phone) updateUser.phone = utilisateur.phone
    if (utilisateur.adress) updateUser.adress = utilisateur.adress
    if (utilisateur.postal) updateUser.postal = utilisateur.postal
    if (utilisateur.town) updateUser.town = utilisateur.town
    if (utilisateur.role) updateUser.role = utilisateur.role

    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth)

    if (auth.role === "admin")
      try {
        const response = await axios.put(`${URL.USER_UPDATE}/${id}`, updateUser, { withCredentials: true })
        if (response.status === 200) {
          navigate("/dashboard/utilisateurs")
          toast.success("Informations utilisateur mises à jour avec succès.", { autoClose: 1000 })
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur : ", error)
        toast.error("Erreur lors de la mise à jour de l'utilisateur.", { autoClose: 3000 })
      }
  }


  return (
    <div>
      <h1 className={items.h1}>Modifier un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div className={items.div1}>

          <label htmlFor="firstname">Prénom :</label>
          <input
            className={items.inputItem}
            type="text"
            name='firstname'
            value={utilisateur.firstname}
            onChange={handleChange} />
          <label htmlFor="lastname">Nom :</label>
          <input
            className={items.inputItem}
            type="text"
            name='lastname'
            value={utilisateur.lastname}
            onChange={handleChange} />
          <label htmlFor="email">E-mail :</label>
          <input
            className={items.inputItem}
            type="text"
            name='email'
            value={utilisateur.email}
            onChange={handleChange} />
          <label htmlFor="phone">Téléphone :</label>
          <input
            className={items.inputItem}
            type="number"
            name='phone'
            value={utilisateur.phone}
            onChange={handleChange} />
          <label htmlFor="adress">Adresse :</label>
          <input
            className={items.inputItem}
            type="text"
            name='adress'
            value={utilisateur.adress}
            onChange={handleChange} />
          <label htmlFor="postal">Code postal :</label>
          <input
            className={items.inputItem}
            type="number"
            name='postal'
            value={utilisateur.postal}
            onChange={handleChange} />
          <label htmlFor="town">Ville :</label>
          <input
            className={items.inputItem}
            type="text"
            name='town'
            value={utilisateur.town}
            onChange={handleChange} />
          <label htmlFor="role">Rôle :</label>
          {/* <input
            className={items.inputItem}
            type="text"
            name='role'
            value={utilisateur.role}
            onChange={handleChange} /> */}
            <select
              name="role" 
              id="role"
              onChange={handleChange}>
              <option>{utilisateur.role === "user" ? "user" : "admin"}</option>
              <option>{utilisateur.role === "user" ? "admin" : "user"}</option>
            </select>

          <div className={items.divBtnAjouter}>
            <button className={items.boutonItemUP}>Mettre à jour</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateUsers