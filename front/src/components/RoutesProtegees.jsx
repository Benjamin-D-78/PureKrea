import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';

const RoutesProtegees = () => {
    const user = localStorage.getItem("auth");
    const auth = user && JSON.parse(user);

    if (!auth) {
        return <Navigate to="/connexion" />;  // Redirige vers /connexion si l'utilisateur n'est pas authentifié
    }

    // Si l'utilisateur a le rôle 'admin', affiche le dashboard et ses sous-routes, sinon redirige vers la page d'accueil
    return auth.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default RoutesProtegees;
