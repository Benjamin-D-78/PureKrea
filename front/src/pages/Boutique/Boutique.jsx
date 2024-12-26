import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/footer.jsx";
import { Link } from "react-router-dom";
import boutique from "./boutique.module.css"
import axios from "axios";
import panier from "../../images/Icones/paniers.png"

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
        <div>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Boutique</h1>

            <div className={boutique.conteneurGlobal}>
                <div className={boutique.conteneurG}></div>

                <div className={boutique.conteneurDH}>
                    <div className={boutique.blocEntete1}>
                        <div className={boutique.entete1}>
                            <p className={boutique.pStock}>Toutes nos cravates</p>
                        </div>
                        <div className={boutique.conteneurSelect}>
                            <select className={boutique.selectEntete} name="width" id="width">
                                <option value="">Largeur</option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <select className={boutique.selectEntete} name="color" id="color">
                                <option value="">Couleur</option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <select className={boutique.selectEntete} name="price" id="price">
                                <option value="">Prix</option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <select className={boutique.selectEntete} name="collection" id="collection">
                                <option value="">Collection</option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div className={boutique.conteneurCartes}>
                        {store && store.map(item => (
                            <div className={boutique.carte} key={item._id}>
                                <div className={boutique.contientDivImg}>
                                    <Link className={boutique.imgCliquable} to={{ pathname: `/details/${item._id}` }}>
                                        <div className={boutique.divImg}>
                                            <div className={boutique.divApercuImg}>
                                                <img className={boutique.apercuImg} src={`http://localhost:8000${item.picture.img}`} alt={item.name} />
                                                <p className={boutique.pRef}>{item.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className={boutique.apercuCravate}>
                                    <div className={boutique.divContientPrix}>
                                        <p className={boutique.apercuPrix}>{item.price} €</p>
                                    </div>
                                    <div className={boutique.divIconAchat}>
                                        <img className={boutique.iconeAchat} src={panier} alt="icone panier" />
                                    </div>
                                    <div className={boutique.divButtonDetails}>
                                        <button className={boutique.buttonDetails}>Plus de détails</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Boutique;