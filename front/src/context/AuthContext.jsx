import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false); // Pour suivre l'authentification.
    const [auth, setAuth] = useState(null); // Pour stocker les informations de l'user connecté.
    const navigate = useNavigate();

    const dataFormConnexion = async (dataForm) => {
        setIsLoading(true);
        try {
            const {data, status} = await axios.post("http://localhost:8000/api/user/connexion", dataForm)
            if(status === 200) {
                localStorage.setItem("auth", JSON.stringify(data));

                setAuth(data);
                navigate("/");
                setIsLoading(false)
            }
        } catch (error) {
            console.log("Echec lors de la connexion de l'utilisateur : ",error.message)
            setIsLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{dataFormConnexion, auth, isLoading}}> {/* On fournit les données au composant enfant. */}
            {children}
        </AuthContext.Provider>
    );
};