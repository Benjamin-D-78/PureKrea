import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"

// CSS
import boutique from "../Boutique/Boutique.module.css"
import detailsCSS from "./details.module.css"

// COMPOSANTS
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import PanierTotal from "../../components/PanierSynthèse/visuelPanier.jsx";
import ConnectezVous from "../../components/ConnectezVous/connectezVous.jsx";
import PrenezRendezVous from "../../components/PrenezRendezVous/prenezRendezVous.jsx";
import Accordeon from "../../components/Accordeon/accordeon.jsx";

// CONTEXT
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanierContext } from "../../context/PanierContext.jsx";

const Details = () => {





    const { auth } = useContext(AuthContext)
    const { ajouterArticle } = useContext(PanierContext)

    const [item, setItem] = useState([]);
    const [error, setError] = useState(null)
    const { id } = useParams(); // On récupère le paramètre dynamique de l'URL.

    const [imgSelection, setImgSelection] = useState("")
    const handleImgSelection = (image) => {
        // Si la même image est sélectionnée, on l'enlève du zoom
        if (imgSelection === image) {
            setImgSelection("");
        } else {
            setImgSelection(image);
        }
    };


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
            <h1 className={boutique.h1Boutique}>{item.name}</h1>

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
                <div >
                    <div className={detailsCSS.blocEntete1}>
                        <div className={detailsCSS.entete1}>
                            <p className={detailsCSS.pName}>Plus de détails</p>
                        </div>
                    </div>
                    {/* <div className={detailsCSS.contientConteneurD}> */}
                        <div className={detailsCSS.conteneurD}>
                            <div className={detailsCSS.conteneurIMG}>

                                {/* "noopener" indique au navigateur d’ouvrir un lien dans un nouvel onglet sans fournir d’accès au document qui a ouvert le lien. 
                                window.opener est automatiquement définie sur null. 
                                C'est fait pour empêcher les attaques de phishing ou prise de contrôle. */}
                                {/* window.opener représente la fenêtre qui a ouvert celle dans laquelle se trouve se code. */}
                                {/* "noreferrer" empêche le site nouvellement ouvert d’obtenir des informations sur l’origine du trafic.
                                C'est fait pour fausser les chiffres de trafic */}
                                <div>{item.picture && item.picture.img &&
                                     <a href={item.picture.img} target="_blank" rel="noopener noreferrer">
                                        <img
                                        tabIndex="0"
                                        className={detailsCSS.imageDetail1}
                                        src={item.picture.img}
                                        alt={item.name} /></a>}</div>

                                <div className={detailsCSS.contientIMG2}>
                                    {item.picture && item.picture.img &&
                                    <a href={item.picture.img2} target="_blank" rel="noopener noreferrer">
                                        <img
                                        tabIndex="0"
                                        className={detailsCSS.imageDetail2}
                                        src={item.picture.img2}
                                        alt={item.name} /></a>}</div>
                            </div>
                            <div className={detailsCSS.conteneurDetails}>
                                <p className={detailsCSS.nomProduit}>{item.name}</p>
                                <div className={detailsCSS.conteneurDetailsProduits}>
                                    <div className={detailsCSS.detailsProduitG}>
                                        <p>Largeur : </p>
                                        <p>Couleur : </p>
                                        <p>Autre : </p>
                                        <p>Motifs : </p>
                                        <p>Collection : </p>
                                        <p>Stock : </p>
                                    </div>
                                    <div className={detailsCSS.detailsProduitD}>
                                        <p>{item.width} cm</p>
                                        <p>{item.color}</p>
                                        <p>{item.content}</p>
                                        <p>{item.detail}</p>
                                        <p>{item.category}</p>
                                        <p>{item.stock}</p>
                                    </div>
                                </div>
                                <p className={detailsCSS.pPrix}>{item.price} €</p>
                                <div className={detailsCSS.contientBtnAjout}>
                                    <button onClick={() => ajouterArticle(item)} className={detailsCSS.btnAjout}>Ajouter au panier</button>
                                    <Link to={{ pathname: "/" }}><button className={detailsCSS.btnRevenir}>Revenir à la boutique</button></Link>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Details