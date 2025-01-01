import { React, createContext, useState, useEffect, useContext } from "react";
import { debounce } from "lodash"
import { AuthContext } from "./AuthContext";

export const PanierContext = createContext()

export const PanierProvider = ({ children }) => {

    const { auth } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);
    const [panier, setPanier] = useState([]);
    const [prixTotal, setPrixTotal] = useState(0);

    useEffect(() => {
        const loadPanier = async () => {
            try {
                const userId = auth ? auth._id : null

                if (userId) {
                    const panierJSON = await localStorage.getItem(`panier${userId}`); // On récupère les données stockées dans le localStorage sous la clé "panier", puis on vérifie si les données existent dans le localStorage.
                    if (panierJSON !== null) {
                        const panierStorage = JSON.parse(panierJSON); // On convertit les données en objet JavaScript.
                        setPanier(panierStorage);
                    }
                }
            } catch (error) {
                console.log("Echec lors du chargement des données : ", error)
            }
        };
        loadPanier();
    }, [auth])


    useEffect(() => {
        let total = 0;
        panier.forEach(item => {
            const itemPrice = parseFloat(item.price);
            const itemQuantite = parseInt(item.quantite, 10);

            // On vérifie que nos données soient des nombres valides.
            if (!isNaN(itemPrice) && !isNaN(itemQuantite)) {
                total += itemPrice * itemQuantite;
            }
        });
        setPrixTotal(parseFloat(total.toFixed(2)));
    }, [panier]);



    // On sauvegarde le panier dans le localStorage :
    const sauvegardePanier = debounce((nouveauPanier) => {
        const userId = auth ? auth._id : null // On récupère l'ID de l'utilisateur depuis le contexte
        if (userId) {
            localStorage.setItem(`panier${userId}`, JSON.stringify(nouveauPanier))
        }
    }, 1000);


    const totalArticle = () => {
        let totalArticle = 0;
        panier.forEach(item => totalArticle += item.quantite);
        return totalArticle;
    }


    const prixParQuantite = (price, quantity) => {
        const resultat = price * quantity
        return parseFloat(resultat.toFixed(2))
    }


    const incremente = (index) => {
        const nouveauPanier = [...panier]
        nouveauPanier[index].quantite++
        setPanier(nouveauPanier)
        sauvegardePanier(nouveauPanier)
    }


    const decremente = (index) => {
        const nouveauPanier = [...panier]
        if (nouveauPanier[index].quantite > 1) {
            nouveauPanier[index].quantite--
            setPanier(nouveauPanier)
            sauvegardePanier(nouveauPanier)
        }
    }

    const changerQuantite = (index, nouvelleQuantite) => {
        const nouveauPanier = [...panier];
        nouveauPanier[index].quantite = nouvelleQuantite; // Met à jour la quantité de l'article
        setPanier(nouveauPanier); // Mettre à jour le state
        sauvegardePanier(nouveauPanier);
    }

    const retirerArticle = (index) => {
        const nouveauPanier = [...panier]
        nouveauPanier.splice(index, 1)
        setPanier(nouveauPanier)
        sauvegardePanier(nouveauPanier)
    }


    const ajouterArticle = async (product) => {
        try {
            const userId = auth ? auth._id : null;
            if (userId) {
                const panier = await localStorage.getItem(`panier${userId}`);
                let nouveauPanier = [];

                // Si le panier existe déjà, on le converti en tableau d'objet.
                if (panier !== null) {
                    nouveauPanier = JSON.parse(panier);

                    // On vérifie si l'article sélectionné existe déjà dans le panier. Si c'est le cas, on augmente la quantité de 1 sinon on ajoute l'article dans le panier.
                    const articleTrouve = nouveauPanier.find(item => item._id === product._id);

                    if (articleTrouve) {
                        articleTrouve.quantite += 1;
                    } else {
                        nouveauPanier.push({ ...product, quantite: 1 });
                    }
                } else {
                    nouveauPanier.push({ ...product, quantite: 1 });
                } // On enregistre maintenant le nouveau panier dans le localStorage :
                sauvegardePanier(nouveauPanier)
                setPanier(nouveauPanier);
            }
        } catch (error) {
            console.log("Erreur lors de l'actualisation du panier : ", error);
        }
    }

    return (
        <PanierContext.Provider value={{ incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, changerQuantite, panier, prixTotal }} >
            {children}
        </PanierContext.Provider>
    )
}