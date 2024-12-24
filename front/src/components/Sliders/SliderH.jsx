import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import slider from "./slider.module.css"
import fond from "../../images/NavBar/fond_NavBar.jpg"

// Carousel
import { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// ACTIONS :
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../redux/reducers/item.reducer.js"

const SliderH = () => {

    const [items, setItems] = useState([])
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const store = useSelector(state => state.itemReducer.data)

    useEffect(() => {
        const depart = async () => {
            dispatch(Actions.ITEM_DEPART())
            try {
                const { data, status } = await axios.get("http://localhost:8000/api/item/all");
                console.log(data);
                dispatch(Actions.ITEM_ARRIVE(data));
                setItems(data);
            } catch (error) {
                console.log("Erreur lors de l'appel API", error)
                setError(error.message);
            }
        };
        depart();
    }, []);

    if (error) return <> <p>{error}</p> </>

    return (
        <div className={slider.container}>
            <div className={slider.grid}>
                {store && store.map(item => (
                    <div className={slider.card}>
                        <img src={`http://localhost:8000${item.picture.img}`} alt={item.name} width={50} />
                        <p className={slider.prix}>{item.price} €</p>
                        <h5>{item.name}</h5>
                        <div className={slider.pool}>
                            <ion-icon name="water-outline"></ion-icon>
                            <p>Piscine inclus</p>
                        </div>
                        <div className={slider.wifi}>
                            <ion-icon name="wifi-outline"></ion-icon>
                            <p>Wifi inclus</p>
                        </div>
                        <button>Plus de détails</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SliderH;