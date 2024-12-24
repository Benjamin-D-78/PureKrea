import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import axios from "axios"

const Details = () => {

    const [item, setItem] = useState([]);
    const [error, setError] = useState(null)
    const {id} = useParams(); // On récupère le paramètre dynamique de l'URL.

    useEffect(() => {
        const detailsItem = async () => {
            try{
                const { data, status } = await axios.get(`http://localhost:8000/api/item/obtenir/${id}`)
                setItem(data);
            } catch (error) {
                setError("Erreur lors de la réception des données", error)
            }
        };
        detailsItem();
    }, [id])

    return (
        <>
        <NavBar/>
        <h1>Details</h1>
        <h2>{item.name}</h2>
        <p>Largeur : {item.width}</p>
        <p>Couleur : {item.color}</p>
        <p>Autre : {item.content}</p>
        <p>Motifs : {item.detail}</p>
        <p>Collection : {item.category}</p>
        <p>Stock : {item.stock}</p>
        <p>Prix: {item.price}</p>
        <p>Disponible: {item.status}</p>
        <Footer/>
        </>
    );
};

export default Details