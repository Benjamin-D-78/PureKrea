import { React, useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext"; // On importe le contexte
import visuel from "./visuelPanier.module.css"
import { PanierContext } from '../../context/PanierContext';

const Panier = () => {

  const {incremente, decremente, ajouterArticle, prixParQuantite, totalArticle, panier, prixTotal} = useContext(PanierContext)
    
  const { auth } = useContext(AuthContext); // On récupère l'objet utilisateur depuis le contexte
  return (
    <section>
      <p className={visuel.nomPrenom}>{auth ? `${auth.firstname}` : ""}</p>
      <p className={visuel.nomPrenom}>{auth ? `${auth.lastname}` : ""}</p>
      <hr className={visuel.hr}/>
      <div className={visuel.divMonPanier}>
        <p>Mon panier :</p>
      </div>

      {panier ? 
      <>
        {/* <div>
          {panier.map((article, index) => (
            <div key={index}>
              <p style={styles.title}>{article.name}</p>
              <img
                style={{ width: 170}}
                src={article.picture[0].img}
              />
              <p>Prix : {priceArticleByQuantity(article.price, article.quantite)} $</p>
              <div style={styles.quantity}>
                <p style={styles.click} onClick={() => decremente(index)}>-</p>
                <p>{article.quantite}</p>
                <p style={styles.click} onClick={() => incremente(index)} >+</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p>Total du panier : {totalPrice}</p>
          <button>Passer la commande ({totalArticle()} articles)</button>
        </div> */}
      </>
       : 
        <p>Panier Vide ! </p>
      }
    </section>
    
  );
};

export default Panier;
