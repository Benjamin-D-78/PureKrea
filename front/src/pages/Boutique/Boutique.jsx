import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import boutique from "./boutique.module.css"

const Boutique = () => {

    const [article, setArticle] = useState([])
    const [error, setError] = useState(null)

    
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/item/all");
                const data = await response.json();
                
                setArticle(data);
            } catch {
                setError(error.message);
            }
        };
        fetchArticle();
    }, []);

    if(error) return <> <p>{error}</p> </>

    return(
        <div>
            <NavBar/> 
            <h1 className={boutique.h1}>Liste des items</h1>
            {article.map((item) => (
                <div key={item._id}>
                    <Link to={{pathname: `/details/${item._id}`}}>
                    <p>{item.name}</p>
                    </Link>
                    <p>Prix : {item.price}€</p>
                    <p>Largeur : {item.width}cm</p>
                    <p>Couleur : {item.color}</p>
                </div>
            ))}
        </div>
    );
};

export default Boutique;