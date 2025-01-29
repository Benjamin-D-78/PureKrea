import { React, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import items from "./css/items.module.css"
import BoutiqueDashboard from './BoutiqueDashboard'
import { URL } from '../../utils/Constantes'

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
    picture: {
      img: "",
      img2: "",
      img3: "",
      img4: ""
    },
    status: true,
  })

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
      const response = await axios.post(URL.ITEM_CREATION, item)
      console.log(response)
      toast.success("Item créé avec succès.", { autoClose: 1000 })
    } catch (error) {
      console.error("Echec de la création de l'item : ", error.message)
      toast.error("Echec de la création de l'item", { autoClose: 3000 })
    }
  }

  return (
    <div className={items.conteneurPrincipal}>
      <h1 className={items.h1}>Ajouter un produit</h1>
      <div className={items.div1}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"> Nom du produit * :</label>
          <input
            className={items.inputItem}
            id='name'
            type="text"
            name='name'
            required
            onChange={handleChange} /> <br />
          <label htmlFor="width"> Largeur * :</label>
          <input
            className={items.inputItem}
            id='width'
            type="number"
            name='width'
            step=".1"
            required
            onChange={handleChange} /> <br />
          <label htmlFor="color"> Couleur * :</label>
          <input
            className={items.inputItem}
            id='color'
            type="text"
            name='color'
            required
            onChange={handleChange} /> <br />
          <label htmlFor="content"> Autre(s) couleur(s) * :</label>
          <input
            className={items.inputItem}
            id='content'
            type="text"
            name='content'
            required
            onChange={handleChange} /> <br />
          <label htmlFor="detail"> Motifs * :</label>
          <input
            className={items.inputItem}
            id='detail'
            type="text"
            name='detail'
            required
            onChange={handleChange} /> <br />
          <label htmlFor="category"> Collection * :</label>
          <input
            className={items.inputItem}
            id='category'
            type="number"
            name='category'
            required
            onChange={handleChange} /> <br />
          <label htmlFor="stock"> Stock * :</label>
          <input
            className={items.inputItem}
            id='stock'
            type="number"
            name='stock'
            required
            onChange={handleChange} /> <br />
          <label htmlFor="price"> Prix * :</label>
          <input
            className={items.inputItem}
            id='price'
            type="number"
            name='price'
            required
            onChange={handleChange} /> <br />

          {images.map((imgName, index) => (
            <div key={index}>
              <label
                htmlFor={`image${index}`}>
                {index === 0 ? "Image principale : " : `Image ${index + 1} :`}
              </label>
              <input
                className={items.inputItem}
                id={`image${index}`}
                type="text"
                name={imgName}
                placeholder={`Image ${imgName.slice(-1)}`}
                onChange={handleChange} /> <br />
            </div>
          ))}
          {/* 
          <label htmlFor="status">En ligne : </label>
          <input
            className={items.checkItem}
            id='status'
            type="checkbox"
            name='status'
            required
            checked={item.status}
            onChange={event => setItem(prev => ({ ...prev, status: event.target.checked }))} /> */}
          <div className={items.divBtnAjouter}>
            <button className={items.boutonItem}>Ajouter</button>
          </div>
        </form>
      </div>
      <BoutiqueDashboard />
    </div>
  )
}

export default AjoutItem;
