import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext"; // Importer le contexte
import { useState } from 'react';

const Profil = () => {


// const [isLoading, setIsLoading] = useState(false)
    
  const { auth } = useContext(AuthContext); // Récupérer l'objet utilisateur depuis le contexte
//   setIsLoading(true)
    console.log(auth)
  return (
    <div>
      <h1>{auth ? `${auth.firstName} ${auth.lastName}` : "Utilisateur"}</h1>
      {/* Vous pouvez afficher d'autres informations utilisateur ici */}
    </div>
  );
};

export default Profil;
