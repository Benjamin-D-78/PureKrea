import React from 'react'
import { useState } from 'react'
import axios from "axios"
import items from "./css/items.module.css"
import BoutiqueDashboard from './BoutiqueDashboard'

const AjoutItem = () => {

  const images = ["img", "img2", "img3"]
  const [item, setItem] = useState({
    name: "",
    width: "",
    color: "",
    content: "",
    detail: "",
    category: "",
    stock: 0,
    price: "",
    img: [],
    status: true,
  })

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
    const formData = new FormData(); // Création d'un objet FormData pour envoyer des données multipart/form-data. Permet l'envoi de fichiers et de données textuelles
    // Ajout des champs du formulaire dans FormData
    formData.append("name", item.name);
    formData.append("width", item.width);
    formData.append("color", item.color);
    formData.append("content", item.content);
    formData.append("detail", item.detail);
    formData.append("category", item.category);
    formData.append("stock", item.stock);
    formData.append("price", item.price);
    item.img.forEach((image) => {
    formData.append("img", image); // Parcours du tableau d'images et ajout de chaque image dans FormData. Le nom 'img' doit correspondre au champ attendu par Multer côté serveur
    });
    formData.append("status", item.status);
    try {
      const response = await axios.post("http://localhost:8000/api/item/creation",formData,
        {headers: {"Content-Type": "multipart/form-data",},}) // Headers spécifiques pour l'envoi de fichiers
      console.log(response)
    } catch (error) {
      console.error("Echec de la création de l'article : ", error.message)
    }
  }

  return (
    <div>
      <h1 className={items.h1}>Ajouter un item</h1>
      <form onSubmit={handleSubmit}>
      <section className={items.formulaire}>
        <div className={items.div1}>
          <label htmlFor="name"> Nom de l'item :</label>
          <input
            className={items.inputItem}
            id='name'
            type="text"
            name='name'
            required
            onChange={handleChange} />
          <label htmlFor="width"> Largeur :</label>
          <input
            className={items.inputItem}
            id='width'
            type="number"
            name='width'
            step=".1"
            required
            onChange={handleChange} />
          <label htmlFor="color"> Couleur :</label>
          <input
            className={items.inputItem}
            id='color'
            type="text"
            name='color'
            required
            onChange={handleChange} />
          <label htmlFor="content"> Autre(s) couleur(s) :</label>
          <input
            className={items.inputItem}
            id='content'
            type="text"
            name='content'
            required
            onChange={handleChange} />
          <label htmlFor="detail"> Motifs :</label>
          <input
            className={items.inputItem}
            id='detail'
            type="text"
            name='detail'
            required
            onChange={handleChange} />
          <label htmlFor="category"> Collection :</label>
          <input
            className={items.inputItem}
            id='category'
            type="number"
            name='category'
            required
            onChange={handleChange} />
          <label htmlFor="stock"> Stock :</label>
          <input
            className={items.inputItem}
            id='stock'
            type="number"
            name='stock'
            required
            onChange={handleChange} />
          <label htmlFor="price"> Prix :</label>
          <input
            className={items.inputItem}
            id='price'
            type="number"
            name='price'
            required
            onChange={handleChange} />
        </div>

        <div className={items.div2}>
          {images.map((imgName, index) => (
          <div key={index}>
              <label
                htmlFor={`image${index}`}>
                {index === 0 ? "Image principale : " : `Image ${index+1}`}
              </label>
              <input
                className={items.inputItem}
                id={`image${index}`}
                type="file"
                name={imgName}
                placeholder={`Image ${imgName.slice(-1)}`}
                onChange={handleChange} />
            </div>
          ))}

          <label htmlFor="status">En ligne : </label>
          <input
            className={items.checkItem}
            id='status'
            type="checkbox"
            name='status'
            required
            checked={item.status}
            onChange={event => setItem(prev => ({ ...prev, status: event.target.checked }))} />

        <button className={items.boutonItem}>Ajouter l'item</button>
      </div>
      </section>
      </form>
      <BoutiqueDashboard/>
    </div>
  )
}

export default AjoutItem;
