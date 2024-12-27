import { useState, useEffect, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/footer.jsx";
import { Link } from "react-router-dom";
import boutique from "./boutique.module.css"
import Panier from "../../components/PanierSynthèse/visuelPanier.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";
import axios from "axios";
import panier from "../../images/Icones/paniers.png"
import { PanierContext } from "../../context/PanierContext.jsx";

// ACTIONS :
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../redux/reducers/item.reducer.js"

const Boutique = () => {

    const {ajouterArticle} = useContext(PanierContext)

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
                <div className={boutique.conteneurG}>
                    <div className={boutique.accordeon}>
                        <Panier/>
                        <p className={boutique.pOnVousDitTout}>On vous dit tout</p>
                        <Accordeon
                            titre="D'où viennent nos soies ?"
                            corps="Toutes nos soies proviennent de chenilles du bombyx du mûrier et sont élevées à proximité de champs de mûres. (Origine : Asie, 80% en provenance de la Chine)." />
                        <Accordeon
                            titre="Quel budget faut-il prévoir ?"
                            corps="Nos prix varient en fonction des modes de tissages pratiqués. Un investissement supplémentaire est à prévoir pour une cravate sur-mesure. Celui-ci se calcule par rapport au temps consacré à sa confection.
                            En moyenne, une cravate sur-mesure a un tarif global entre 250 et 400 euros. " />
                        <Accordeon
                            titre="Quel est le délai de fabrication ?"
                            corps="Il faut compte 2 mois de délais pour la réalisation d'une cravate sur-mesure, et 2 semaines supplémentaires en cas de retouches éventuelles." />
                        <Accordeon
                            titre="Quelles sont nos limites en sur-mesure ?"
                            corps="Nous n'en avons pas à proprement parler. Nos limites sont les vôtres. Néanmoins nous n'acceptons pas les demandent trop marginales et pouvant offenser autrui." />
                        <Accordeon
                            titre="Un rendez-vous est-il obligatoire ?"
                            corps="Oui, un rendez-vous minimum est obligatoire. Il est la certitude que nous répondrons pleinement à vos attentes. Vous pourrez à cette occasion nous poser toutes vos questions, et nous de même." />
                        <Accordeon
                            titre="Quelle est notre politique de retour ?"
                            corps="En sur-mesure, il n'y en a pas. La prise de rendez-vous est nécessaire et conçue pour éviter ce désagrément. Pour le prêt-à-porter, vous disposez d'un délai d'une semaine pour nous retourner le ou les articles à compter de leur réception." />
                    </div>
                </div>

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
                                        <Link className={boutique.btnCliquable} to={{ pathname: `/details/${item._id}` }}>
                                            <button className={boutique.buttonDetails}>Plus de détails</button>
                                        </Link>
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