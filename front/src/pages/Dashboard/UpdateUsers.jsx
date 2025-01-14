import { React, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';

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
    role: "",
  });

  useEffect(() => {
    const userById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/obtenir/${id}`, { withCredentials: true })
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

    if (newMDP && newMDP !== "") {
      if (!ancienMDP || ancienMDP === "") {
        toast.error("Le mot de passe actuel est requis pour changer de mot de passe.");
        return;
      }

      updateUser.password = newMDP;
      updateUser.ancienMDP = ancienMDP;
    }

    if (utilisateur.lastname) updateUser.lastname = utilisateur.lastname
    if (utilisateur.firstname) updateUser.firstname = utilisateur.firstname
    if (utilisateur.email) updateUser.email = utilisateur.email
    if (utilisateur.role) updateUser.role = utilisateur.role

    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth)

    if (auth.role === "admin")
      try {
        const response = await axios.put(`http://localhost:8000/api/user/update/${id}`, updateUser, { withCredentials: true })
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
      <h1>Modifier un utilisateur</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          name='firstname'
          value={utilisateur.firstname}
          onChange={handleChange} />
        <label htmlFor="lastname">Nom </label>
        <input
          type="text"
          name='lastname'
          value={utilisateur.lastname}
          onChange={handleChange} />
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name='email'
          value={utilisateur.email}
          onChange={handleChange} />
        <label htmlFor="role">Rôle</label>
        <input
          type="text"
          name='role'
          value={utilisateur.role}
          onChange={handleChange} />

        <button>Mettre à jour l'utilisateur</button>
      </form>
    </div>
  )
}

export default UpdateUsers