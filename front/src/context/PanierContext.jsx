import { React, createContext, useState, useEffect, useContext } from "react";
import { debounce } from "lodash"
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";

export const PanierContext = createContext()

export const PanierProvider = ({ children }) => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();

    // const [isLoading, setIsLoading] = useState(false);
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
            if (!auth) { 
                navigate("/connexion")
            }

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
                        if (articleTrouve.quantite < product.stock) {
                            articleTrouve.quantite += 1;
                        } else {
                            toast.error("Le stock maximum a été atteint pour cet article.", { autoClose: 1000 })
                        }
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

    const videPanier = () => {
        setPanier([]);
        const userId = auth ? auth._id : null; // Si auth existe, on extrait l'ID que l'on stocke dans userId, puis on supprime son panier.
        if(userId) {
            localStorage.removeItem(`panier${userId}`)
        }
    }

    const validerCommande = async () => {
        try {    
            // On vérifie que le panier n'est pas vide.
            if (panier.length === 0) {
                toast.error("Votre panier est vide. Veuillez ajouter des articles pour pouvoir passer commande.");
                return;
            }
    
            // On calcule le prix total du panier en ajoutant le prix total pour chaque article
            const panierTotal = panier.map(item => ({
                ...item, // Pour chaque item du tableau "panier" on retourne un nouvel objet. Comme ça on garde toutes les prop's originales sans les modifier.
                totalPrice: item.price * item.quantite  // Pour chaque item on ajoute une propriété "totalPrice" qui calcule le prix de l'article multiplié par la quantité.
            }));
    
            // On calcule le prix total de la commande :
            const prixTotal = panierTotal.reduce((total, item) => total + item.totalPrice, 0);
    
            // On créé notre objet de commande à envoyer à notre back.
            const commandeData = {
                userId: auth._id,  // ID de l'utilisateur
                panier: panierTotal.map(item => ({
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantite,
                    totalPrice: item.totalPrice // On ajoute le prix total calculé pour l'article
                })),
                total: prixTotal,  // On indique le prix total de la commande.
            };
    
            
            const response = await axios.post('http://localhost:8000/api/commande/creation', commandeData);

            if (response.status === 201) {
                toast.success("Commande validée avec succès!", {autoClose: 2000});
                navigate('/confirmation');
            }
    
        } catch (error) {
            console.error("Erreur lors de la validation de la commande:", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
        }
    };
    
    

    return (
        <PanierContext.Provider value={{ incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, changerQuantite, videPanier, validerCommande, panier, prixTotal }} >
            {children}
        </PanierContext.Provider>
    )
}