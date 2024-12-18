import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import boutique_dashboard from "./boutique_dashboard.module.css"
import axios from "axios"
import { Link } from "react-router-dom";


const BoutiqueDashboard = () => {

    const [items, setItems] = useState([])
    const [error, setError] = useState(null)

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/item/delete/${id}`);

            if (response.status === 200) {
                console.log(response)
                alert("Item supprimé avec succès.");
                setItems((prevItems) => prevItems.filter((item) => item._id !== id));} // On met à jour le state local en retirant de la liste l'item supprimé.
        } catch (error) {
            console.log("Erreur lors de la suppression de l'item", error);
        }
    };


        const allItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/item/all");
                setItems(response.data);
            } catch {
                setError(error.message);
            }
        };
        useEffect(() => {allItems()}, []);

    if (error) return <> <p>{error}</p> </>;

    return (
        <div>
            <NavBar />
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
                        <th className={boutique_dashboard.thButton}><button className={boutique_dashboard.refreshItems} onClick={allItems}>Raffraîchir</button></th>
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
                            <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={`http://localhost:8000${item.picture.img}`} alt={item.name} /></div>

                            {item.picture.img2 && <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={`http://localhost:8000${item.picture.img2}`} alt={`${item.name} 2`} /></div>}

                            {item.picture.img3 && <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={`http://localhost:8000${item.picture.img3}`} alt={`${item.name} 3`} /></div>}
                            
                            {item.picture.img4 && <div className={boutique_dashboard.divImage}><img className={boutique_dashboard.imgImage} src={`http://localhost:8000${item.picture.img4}`} alt={`${item.name} 4`} /></div>}
                        </td>
                        <td className={boutique_dashboard.boutonsTD}>
                            <Link to={{ pathname: `/dashboard/update/${item._id}`}}><button className={boutique_dashboard.controlItem1}>Modifier</button></Link>
                            <button onClick={() => deleteItem(item._id)} className={boutique_dashboard.controlItem3}>Supprimer</button>
                        </td>
                    </tr>
                ))}
           </tbody>
        </table>
    </div>
    );
};

export default BoutiqueDashboard;