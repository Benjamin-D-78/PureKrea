import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import items from "./css/items.module.css"

const UpdateItems = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const images = ["img", "img2", "img3", "img4"]
    const [item, setItem] = useState({
        name: "",
        width: "",
        color: "",
        content: "",
        detail: "",
        category: "",
        stock: "",
        price: "",
        img: [],
        status: true,
    })

    useEffect(() => {
        const itemById = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/item/obtenir/${id}`)
                setItem(response.data)
            } catch (error) {
                console.error("Erreur lors de la modification de l'item", error.message)
            }
        };
        itemById();
    }, [id])

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name.startsWith("img")) { // On vérifie que la chaîne de caractère commence bien par "img"
            setItem(prev => ({
                ...prev, // Garde toutes les propriétés précédentes
                img: files ? [...prev.img, files[0]] : prev.img, // Si des fichiers sont sélectionnés, ajoute le premier fichier au tableau d'images. Sinon, on conserve le tableau d'images existant
            }));
        } else {
            setItem(prev => ({ ...prev, [name]: value }))
        }
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8000/api/item/update/${id}`, item, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        
        if (response.status === 200) {
            console.log("Item updated successfully:", response.data);
            // Vous pouvez mettre à jour l'état ici ou rediriger l'utilisateur
            setItem(response.data.response); // Si la réponse contient les nouvelles données
            // navigate("/dashboard/items"); // Rediriger vers une autre page si nécessaire
        }
    } catch (error) {
        console.error("Echec de la mise à jour de l'article:", error.message);
    }
}


    return (
        <div>
            <h1 className={items.h1}>Modifier un item</h1>
            <form onSubmit={handleSubmit}>
                <section className={items.formulaire}>
                    <div className={items.div1}>
                        <label htmlFor="name"> Nom de l'item :</label>
                        <input
                            className={items.inputItem}
                            id='name'
                            type="text"
                            name='name'
                            value={item.name}
                            required
                            onChange={handleChange} />
                        <label htmlFor="width"> Largeur :</label>
                        <input
                            className={items.inputItem}
                            id='width'
                            type="number"
                            name='width'
                            value={item.width}
                            required
                            onChange={handleChange} />
                        <label htmlFor="color"> Couleur :</label>
                        <input
                            className={items.inputItem}
                            id='color'
                            type="text"
                            name='color'
                            value={item.color}
                            required
                            onChange={handleChange} />
                        <label htmlFor="content"> Autre(s) couleur(s) :</label>
                        <input
                            className={items.inputItem}
                            id='content'
                            type="text"
                            name='content'
                            value={item.content}
                            required
                            onChange={handleChange} />
                        <label htmlFor="detail"> Motifs :</label>
                        <input
                            className={items.inputItem}
                            id='detail'
                            type="text"
                            name='detail'
                            value={item.detail}
                            required
                            onChange={handleChange} />
                        <label htmlFor="category"> Collection :</label>
                        <input
                            className={items.inputItem}
                            id='category'
                            type="number"
                            name='category'
                            value={item.category}
                            required
                            onChange={handleChange} />
                        <label htmlFor="stock"> Stock :</label>
                        <input
                            className={items.inputItem}
                            id='stock'
                            type="number"
                            name='stock'
                            value={item.stock}
                            required
                            onChange={handleChange} />
                        <label htmlFor="price"> Prix :</label>
                        <input
                            className={items.inputItem}
                            id='price'
                            type="number"
                            name='price'
                            value={item.price}
                            required
                            onChange={handleChange} />
                        <label htmlFor="status">En ligne : </label>
                        <input
                            className={items.checkItem}
                            id='status'
                            type="checkbox"
                            name='status'
                            required
                            checked={item.status}
                            onChange={event => setItem(prev => ({ ...prev, status: event.target.checked }))} />
                        <button className={items.boutonItem} type='submit'>Ajouter l'item</button>


                    </div>
                </section>
            </form>
        </div>
    )
}

export default UpdateItems