import React from 'react'
import { useState, useEffect } from 'react'
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import axios from "axios"
import { Link } from 'react-router-dom'
import AjoutUtilisateur from './Users'

// ACTIONS :
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from "../../redux/reducers/user.reducer"

const Utilisateurs = () => {

  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const dispatch = useDispatch();
  const store = useSelector(state => state.userReducer.data)

  
  const deleteUser = async (id) => {
    const userAuth = localStorage.getItem("auth");
    const auth = userAuth && JSON.parse(userAuth);

    if(auth.role === "admin") {
    try {
      const response = await axios.delete(`http://localhost:8000/api/user/delete/${id}`)
      if (response.status === 200) {
        console.log(response)
        alert("Utilisateur supprimé avec succès");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));} // On met à jour le state local en retirant de la liste l'item supprimé.
    } catch (error) {
      console.log("Erreur lors de la suppression de l'utilisateur", error)
    }
  }}

    const depart = async () => {
      dispatch(Actions.USER_DEPART())
      try {
        const { data, status } = await axios.get("http://localhost:8000/api/user/all");
        console.log(data);
        dispatch(Actions.USER_ARRIVE(data));
        setUsers(data);
      } catch (error) {
        console.log("Erreur lors de l'appel API", error)
        setError(error.message)
      }
    };
    useEffect(() => {depart()}, []);

  if (error) return <> <p>{error}</p> </>;

  return (
    <div>
      <AjoutUtilisateur/>
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
          {store && store.map(user => (
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
                <Link to={{ pathname: `/user/update/${user._id}` }}><button className={boutique_dashboard.controlItem1}>Modifier</button></Link>
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
