import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";
import boutique from "./boutique.module.css"
import axios from "axios";

// ACTIONS :
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../redux/reducers/item.reducer.js"

const Boutique = () => {

    const [items, setItems] = useState([])
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const store = useSelector(state => state.itemReducer.data)
    
    useEffect(() => {
        const depart = async () => {
            dispatch(Actions.ITEM_DEPART())
            try {
                const {data, status} = await axios.get("http://localhost:8000/api/item/all");
                dispatch(Actions.ITEM_ARRIVE(data));
                setItems(data);
            } catch (error) {
                console.log("Erreur lors de l'appel API", error)
                setError(error.message);
            }
        };
        depart();
    }, []);

    if(error) return <> <p>{error}</p> </>

    return(
        <div>
            <NavBar/> 
            <h1 className={boutique.h1}>Toutes nos cravates</h1>
            {store && store.map(item => (
                <div key={item._id}>
                    <Link to={{pathname: `/details/${item._id}`}}>
                    <p>{item.name}</p>
                    </Link>
                    <p>Prix : {item.price}€</p>
                    <p>Largeur : {item.width}cm</p>
                    <p>Couleur : {item.color}</p>
                </div>
            ))}
            <Footer/>
        </div>
    );
};

export default Boutique;