import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import axios from "axios"

// COMPOSANTS
import AjoutUtilisateur from './Users'

const Utilisateurs = () => {

  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)


  const deleteUser = async (id) => {
    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth);

    if (auth.role === "admin") {
      try {
        const response = await axios.delete(`http://localhost:8000/api/user/delete/${id}`, { withCredentials: true })
        if (response.status === 200) {
          console.log(response)
          alert("Utilisateur supprimé avec succès");
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } // On met à jour le state local en retirant de la liste l'utilisateur supprimé.
      } catch (error) {
        console.log("Erreur lors de la suppression de l'utilisateur", error)
      }
    }
  }

  const depart = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/all", { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.log("Erreur lors de l'appel API", error)
      setError(error.message)
    }
  };
  useEffect(() => { depart() }, []);

  if (error) return <> <p>{error}</p> </>;

  return (
    <div>
      <AjoutUtilisateur />
      <h1 className={boutique_dashboard.h1}>Liste des utilisateurs</h1>

      <table className={boutique_dashboard.tableItem}>
        <thead>
          <tr className={boutique_dashboard.enteteItem}>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <th>Adresse</th>
            <th>CP</th>
            <th>Numéro</th>
            <th>Role</th>
            <th>Statut</th>
            <th className={boutique_dashboard.thButton}><button className={boutique_dashboard.refreshItems} onClick={depart}>Raffraîchir</button></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className={boutique_dashboard.autresTD}>{user.firstname}</td>
              <td className={boutique_dashboard.autresTD}>{user.lastname}</td>
              <td className={boutique_dashboard.autresTD}>{user.email}</td>
              <td className={boutique_dashboard.autresTD}>{user.adress}</td>
              <td className={boutique_dashboard.autresTD}>{user.postal}</td>
              <td className={boutique_dashboard.autresTD}>{user.phone}</td>
              <td className={boutique_dashboard.autresTD}>{user.role}</td>
              <td className={boutique_dashboard.autresTD}>{user.isActive}</td>
              <td className={boutique_dashboard.boutonsTD}>
                <Link to={{ pathname: `/dashboard/update/utilisateur/${user._id}` }}><button className={boutique_dashboard.controlItem1}>Modifier</button></Link>
                <button onClick={() => deleteUser(user._id)} className={boutique_dashboard.controlItem3}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Utilisateurs
