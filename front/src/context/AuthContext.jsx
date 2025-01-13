import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false); // Pour suivre l'authentification.
    const [auth, setAuth] = useState(null); // Pour stocker les informations de l'user connecté.
    const navigate = useNavigate();

    useEffect(() => {connexion()}, [])

    const dataFormConnexion = async (dataForm) => {
        setIsLoading(true);
        try {
            // , {withCredentials: true}
            const {data, status} = await axios.post("http://localhost:8000/api/user/connexion", dataForm, {withCredentials: true})
            if(status === 200) {
                localStorage.setItem("auth", JSON.stringify(data));
                
                setAuth(data);
                navigate("/");
                setIsLoading(false)
                toast.success("Connexion réussie !", {autoClose: 1000})
            }
        } catch (error) {
            console.log("Echec lors de la connexion de l'utilisateur : ",error.message)
            setIsLoading(false)
            toast.error("Erreur lors de la tentative de connecion.", {autoClose: 3000})
        }
    }

    const connexion = async () => {
        setIsLoading(true)
        try {
            const authData = localStorage.getItem("auth") // On récupère les données de l'utilisateur depuis le localStorage
            setAuth(authData ? JSON.parse(authData) : null)
            setIsLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    };

    const deconnexion = () => {
        setIsLoading(true)
        setAuth(null) // Réinitialise le state à "null"

        localStorage.removeItem("auth") // Supprime les infos de l'utilisateur du localStorage.
        navigate("/")
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{dataFormConnexion, auth, setAuth, deconnexion, isLoading}}> {/* On fournit les données au composant enfant. */}
            {children}
        </AuthContext.Provider>
    );
};