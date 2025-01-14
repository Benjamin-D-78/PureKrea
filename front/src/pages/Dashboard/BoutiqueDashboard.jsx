import React from "react";
import { useState, useEffect } from "react";
import boutique_dashboard from "./css/boutique_dashboard.module.css"
import axios from "axios"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Items = () => {

    const [items, setItems] = useState([])
    const [error, setError] = useState(null)


    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/item/delete/${id}`);

            if (response.status === 200) {
                console.log(response.data)
                toast.success("Item supprimé avec succès.", {autoClose: 1000});
                setItems((prevItems) => prevItems.filter((item) => item._id !== id));} // On met à jour le state local en retirant de la liste l'item supprimé.
        } catch (error) {
            console.log("Erreur lors de la suppression de l'item", error);
            toast.error("Erreur lors de la suppression de l'item", {autoClose: 3000})

        }
    };


        const depart = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/item/all");
                setItems(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        useEffect(() => {depart()}, []);

    if (error) return <> <p>{error}</p> </>;

    return (
        <div>
            <h1 className={boutique_dashboard.h1}>Liste des items</h1>
            
            <table className={boutique_dashboard.tableItem}>
                <thead>
                    <tr className={boutique_dashboard.enteteItem}>
                        <th>Nom</th>
                        <th>Largeur</th>
                        <th>Couleur</th>
                        <th>Autre(s)</th>
                        <th>Motifs</th>
                        <th>Collection</th>
                        <th>Stock</th>
                        <th>Prix</th>
                        <th>Images</th>
                        <th className={boutique_dashboard.thButton}><button className={boutique_dashboard.refreshItems} onClick={depart}>Raffraîchir</button></th>
                    </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item._id}>
                        <td className={boutique_dashboard.autresTD}>{item.name}</td>
                        <td className={boutique_dashboard.autresTD}>{item.width}cm</td>
                        <td className={boutique_dashboard.autresTD}>{item.color}</td>
                        <td className={boutique_dashboard.autresTD}>{item.content}</td>
                        <td className={boutique_dashboard.autresTD}>{item.detail}</td>
                        <td className={boutique_dashboard.autresTD}>{item.category}</td>
                        <td className={boutique_dashboard.autresTD}>{item.stock}</td>
                        <td className={boutique_dashboard.autresTD}>{item.price}€</td>
                        <td className={boutique_dashboard.imagesTD}>
                            <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={item.picture.img} alt={item.name} /></div>

                            {item.picture.img2 && <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={item.picture.img2} alt={`${item.name} 2`} /></div>}

                            {item.picture.img3 && <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={item.picture.img3} alt={`${item.name} 3`} /></div>}
                            
                        </td>
                        <td className={boutique_dashboard.boutonsTD}>
                            <Link to={{ pathname: `/dashboard/update/item/${item._id}`}}><button className={boutique_dashboard.controlItem1}>Modifier</button></Link>
                            <button onClick={() => deleteItem(item._id)} className={boutique_dashboard.controlItem3}>Supprimer</button>
                        </td>
                    </tr>
                ))}
           </tbody>
        </table>
    </div>
    );
};

export default Items;