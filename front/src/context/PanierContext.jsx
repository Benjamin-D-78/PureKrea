import {React, createContext, useState, useEffect} from "react";
import {debounce} from "lodash"

export const PanierContext = createContext()

export const PanierProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [panier, setPanier] = useState([]);
    const [prixTotal, setPrixTotal] = useState(0);

    useEffect(() => {
        const loadPanier = async () => {
            try {
                const panierJSON = await localStorage.getItem("panier"); // On récupère les données stockées dans le localStorage sous la clé "panier", puis on vérifie si les données existent dans le localStorage.
                if(panierJSON !== null){
                    const panierStorage = JSON.parse(panierJSON); // On convertit les données en objet JavaScript.
                    setPanier(panierStorage);
                }
            } catch (error) {
                console.log("Echec lors du chargement des données : ", error)
            }
        };
        loadPanier();
    }, [])


    useEffect(() => {
        let total = 0;
        panier.forEach(item => total += item.quantite * item.price)
        setPrixTotal(parseFloat(total.toFixed(2)));
    }, [panier]);


    // On sauvegarde le panier dans le localStorage :
    const sauvegardePanier = debounce((nouveauPanier) => {
        localStorage.setItem("panier", JSON.stringify(nouveauPanier))
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
        if (nouveauPanier[index].quantite > 1){
            nouveauPanier[index].quantite--
            setPanier(nouveauPanier)
            sauvegardePanier(nouveauPanier)
        }
    }


    const retirerArticle = (index) => {
        const nouveauPanier = [...panier]
        nouveauPanier.splice(index, 1)
        setPanier(nouveauPanier)
    }


    const ajouterArticle = async (product) => {
        try {
            const panier = await localStorage.getItem("panier");
            let nouveauPanier = [];

            // Si le panier existe déjà, on le converti en tableau d'objet.
            if(panier !== null) {
                nouveauPanier = JSON.parse(panier);

                // On vérifie si l'article sélectionné existe déjà dans le panier. Si c'est le cas, on augmente la quantité de 1 sinon on ajoute l'article dans le panier.
                const articleTrouve = nouveauPanier.find(item => item._id == product._id);

                if(articleTrouve){
                    articleTrouve.quantite += 1;
                } else {
                    nouveauPanier.push({ ...product, quantite: 1});
                }
            } else {
                nouveauPanier.push({...product, quantite: 1});
            } // On enregistre maintenant le nouveau panier dans le localStorage :
            sauvegardePanier(nouveauPanier)
            setPanier(nouveauPanier);
        } catch (error) {
            console.log("Erreur lors de l'actualisation du panier : ",error);
        }
    }

    return (
            <PanierContext.Provider value={{ incremente , decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle,  panier, prixTotal }} >
              {children}
            </PanierContext.Provider>
    )
}