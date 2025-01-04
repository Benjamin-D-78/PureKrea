import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

// CSS
import boutique from "../Boutique/boutique.module.css"
import detailsCSS from "./details.module.css"

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/footer";
import PanierTotal from "../../components/PanierSynthèse/visuelPanier.jsx";
import ConnectezVous from "../../components/ConnectezVous/connectezVous.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";

// CONTEXT
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanierContext } from "../../context/PanierContext.jsx";

const Details = () => {

    const { auth } = useContext(AuthContext)
    const { incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, panier, prixTotal } = useContext(PanierContext)

    const [item, setItem] = useState([]);
    const [error, setError] = useState(null)
    const { id } = useParams(); // On récupère le paramètre dynamique de l'URL.

    useEffect(() => {
        const detailsItem = async () => {
            try {
                const { data, status } = await axios.get(`http://localhost:8000/api/item/obtenir/${id}`)
                setItem(data);
            } catch (error) {
                setError("Erreur lors de la réception des données", error)
            }
        };
        detailsItem();
    }, [id])

    return (
        <main>
            <NavBar />
            <h1 className={boutique.h1Boutique}>Details</h1>

            <div className={detailsCSS.conteneurGlobal}>
                <div className={detailsCSS.conteneurG}>
                    {auth ? <PanierTotal /> : <ConnectezVous />}
                    <PrenezRendezVous />

                    <div className={boutique.accordeon}>
                        <p className={boutique.pOnVousDitTout}>On vous dit tout</p>
                        <Accordeon
                            titre="D'où viennent nos soies ?"
                            corps={<>Toutes nos soies proviennent de chenilles du bombyx du mûrier et sont élevées à proximité de champs de mûres.<br /> (Origine : Asie, 80% en provenance de la Chine).</>} />
                        <Accordeon
                            titre="Quel budget faut-il prévoir ?"
                            corps={<>Nos prix varient en fonction des modes de tissages pratiqués. Un investissement supplémentaire est à prévoir pour une cravate sur-mesure.<br /> Celui-ci se calcule par rapport au temps consacré à sa confection.
                                En moyenne, une cravate sur-mesure a un tarif global entre 250 et 400 euros.</>} />
                        <Accordeon
                            titre="Quel est le délai de fabrication ?"
                            corps="Il faut compter 2 mois de délais pour la réalisation d'une cravate sur-mesure, et 2 semaines supplémentaires en cas de retouches éventuelles." />
                        <Accordeon
                            titre="Quelles sont nos limites en sur-mesure ?"
                            corps="Nous n'en avons pas à proprement parler. Nos limites sont les vôtres. Néanmoins nous n'acceptons pas les demandent trop marginales et pouvant offenser autrui." />
                        <Accordeon
                            titre="Un rendez-vous est-il obligatoire ?"
                            corps="Oui, un rendez-vous minimum est obligatoire. Il est la certitude que nous répondrons pleinement à vos attentes. Vous pourrez à cette occasion nous poser toutes vos questions, et nous de même." />
                        <Accordeon
                            titre="Quelle est notre politique de retour ?"
                            corps={<>En sur-mesure, il n'y en a pas. La prise de rendez-vous est nécessaire et conçue pour éviter ce désagrément.<br />Pour le prêt-à-porter, vous disposez d'un délai d'une semaine pour nous retourner le ou les articles à compter de leur réception.</>} />
                    </div>
                </div>
                <div className={detailsCSS.conteneurD}>
                    <div className={detailsCSS.blocEntete1}>
                        <div className={detailsCSS.entete1}>
                            <h2 className={detailsCSS.pName}>{item.name}</h2>
                        </div>
                    </div>
                    <div className={detailsCSS.conteneurIMG}>
                        <div className={detailsCSS.imageDetail}>{item.picture && item.picture.img && <img src={item.picture.img} alt={item.name} />}</div>
                        <div className={detailsCSS.imageDetail}>{item.picture && item.picture.img && <img src={item.picture.img2} alt={item.name} />}</div>
                    </div>
                    <div className={detailsCSS.detailsProduit}>
                        <p>Largeur : {item.width} cm</p>
                        <p>Couleur : {item.color}</p>
                        <p>Autre : {item.content}</p>
                        <p>Motifs : {item.detail}</p>
                        <p>Collection : {item.category}</p>
                        <p>Stock : {item.stock}</p>
                        <p>Prix: {item.price} €</p>
                        <p>Disponible: {item.status}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Details