import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import items from "./css/items.module.css"
import { URL } from '../../utils/Constantes'

const UpdateItems = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const images = ["img", "img2", "img3"]
    const [item, setItem] = useState({
        name: "",
        width: "",
        color: "",
        content: "",
        detail: "",
        category: "",
        stock: "",
        price: "",
        picture: {
            img: "",
            img2: "",
            img3: "",
            img4: ""
        },
        status: true,
    })

    useEffect(() => {
        const itemById = async () => {
            try {
                const response = await axios.get(`${URL.ITEM_BY_ID}/${id}`)
                console.log(response.data)
                setItem(response.data)
            } catch (error) {
                console.error("Erreur lors de la recherche de l'item.", error.message)
            }
        };
        itemById();
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith("img")) { // On vérifie que la chaîne de caractère commence bien par "img"
            setItem(prev => ({
                ...prev, // Garde toutes les propriétés précédentes
                picture: { ...prev.picture, [name]: value }
            }));
        } else {
            setItem(prev => ({ ...prev, [name]: value }))
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`${URL.ITEM_UPDATE}/${id}`, item);
            navigate("/dashboard/items")
            toast.success("Item mis à jour avec succès.", { autoClose: 1000 })
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'item : ", error);
            toast.error("Erreur lors de la mise à jour de l'item.", { autoClose: 3000 })
        }
    };


    return (
        <div>
            <h1 className={items.h1}>Modifier un item</h1>
            <form onSubmit={handleSubmit}>
                <div className={items.div1}>
                    <label htmlFor="name">Nom de l'item :</label>
                    <input
                        className={items.inputItem}
                        id="name"
                        type="text"
                        name="name"
                        value={item.name}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="width">Largeur :</label>
                    <input
                        className={items.inputItem}
                        id="width"
                        type="number"
                        name="width"
                        value={item.width}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="color">Couleur :</label>
                    <input
                        className={items.inputItem}
                        id="color"
                        type="text"
                        name="color"
                        value={item.color}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="content">Autre(s) couleur(s) :</label>
                    <input
                        className={items.inputItem}
                        id="content"
                        type="text"
                        name="content"
                        value={item.content}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="detail">Motifs :</label>
                    <input
                        className={items.inputItem}
                        id="detail"
                        type="text"
                        name="detail"
                        value={item.detail}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="category">Collection :</label>
                    <input
                        className={items.inputItem}
                        id="category"
                        type="number"
                        name="category"
                        value={item.category}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="stock">Stock :</label>
                    <input
                        className={items.inputItem}
                        id="stock"
                        type="number"
                        name="stock"
                        value={item.stock}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="price">Prix :</label>
                    <input
                        className={items.inputItem}
                        id="price"
                        type="number"
                        name="price"
                        value={item.price}
                        required
                        onChange={handleChange}
                    />

                    {images.map((imgName, index) => (
                        <div key={index}>
                            <label htmlFor={`image${index}`}>
                                {index === 0 ? 'Image principale : ' : `Image ${index + 1}`}
                            </label>
                            <input
                                className={items.inputItem}
                                id={`image${index}`}
                                type="text"
                                name={imgName}
                                onChange={handleChange}
                                value={item.picture[imgName] ? item.picture[imgName] : ""}
                            />
                        </div>
                    ))}

                    {/* <label htmlFor="status">En ligne : </label>
                        <input
                            className={items.checkItem}
                            id="status"
                            type="checkbox"
                            name="status"
                            checked={item.status}
                            onChange={(event) =>
                                setItem((prev) => ({ ...prev, status: event.target.checked }))
                            }
                        /> */}
                    <div className={items.divBtnAjouter}>
                        <button className={items.boutonItemUP}>Mettre à jour l'item</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateItems