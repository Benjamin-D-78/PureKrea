import { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar.jsx";

const Home = () => {

    const [article, setArticle] = useState([])
    const [error, setError] = useState(null)

    
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/item/all");
                const data = await response.json();
                console.log(data)
                
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
            <h1>Bienvenu sur ma page d'accueil</h1>
            {article.map((item) => (
                <div key={item._id}>
                    <p>{item.name}</p>
                    <p>Prix : {item.price}€</p>
                    <p>Largeur : {item.width}cm</p>
                    <p>Couleur : {item.color}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;