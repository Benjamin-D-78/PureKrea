import { React, useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext"; // On importe le contexte
import { PanierContext } from '../../context/PanierContext';
import { Link, useNavigate } from 'react-router-dom';
import visuelPanier from "./visuelPanier.module.css"
import supprimer from "../../images/Icones/supprimer.png"


const PanierTotal = () => {

  const { incremente, decremente, ajouterArticle, retirerArticle, prixParQuantite, totalArticle, changerQuantite, panier, prixTotal } = useContext(PanierContext)

  const { auth } = useContext(AuthContext); // On récupère l'objet utilisateur depuis le contexte

  return (
    <section className={visuelPanier.containerPanier}>
      <p className={visuelPanier.nom}>{auth ? `${auth.firstname}` : ""}</p>
      <p className={visuelPanier.prenom}>{auth ? `${auth.lastname}` : ""}</p>
      <hr className={visuelPanier.hr} />

      <p className={visuelPanier.pMonPanier}>Mon panier :</p>
      <div className={visuelPanier.synthesePanier}>
        <p className={visuelPanier.pQte}>Qté</p>
        <p className={visuelPanier.pPrix}>Prix</p>
        <p className={visuelPanier.totalArticle}>{totalArticle()}</p>
        <p className={visuelPanier.prixTotal}>{prixTotal} €</p>
      </div>

      {panier.map((article, index) => (
        <div key={index} className={visuelPanier.detailsPanier}>
          <p className={visuelPanier.nomArticle}>{article.name}</p>

          <select
            className={visuelPanier.selectQTE}
            // On lie la quantité de l'article dans le panier à la valeur de l'option sélectionnée dans le select
            // Chaque modification dans le selecteur appelle la fonction "changerQuantite".
            value={article.quantite}
            // on appelle onChange a chaque fois qu'une nouvelle quantité est choisie dans le select.
            // index sert à identifier quel article doit être modifié.
            // event.target.value cible na nouvelle quantité choisie convertie en nombre entier avec parseInt.
            onChange={(event) => changerQuantite(index, parseInt(event.target.value, 10))}
          >
            {/* On créé des options de quantité allant de 1 à la quantité que j'ai en stock */}
            {/* On créé un tableau vide de longueur égale à la valeur en stock. */}
            {/* "..." = spread operator. On itère le tableau à chaque valeur du stock, c'est ce qui nous permet (avec article.stock) d'avoir le tableau avec des valeurs égales aux valeur qu'il y a en stock */}
            {/* "_" est une convention pour dire que l'on a pas besoin de la valeur de l'élément puisquelle est "undefined". */}
            {[...Array(article.stock)].map((_, qte) => (
              <option key={qte} value={qte + 1}> {/* value={qte + 1} correspond à la quantité disponible à choisir. */}
                {qte + 1}
              </option>
            ))}
          </select>
          {/* Ici on multiplie le prix par la quantité avec la fonction "prixParQuantite" définie dans notre PanierContext */}
          <p className={visuelPanier.prixArticle}>{prixParQuantite(article.price, article.quantite)} €</p>
          <div className={visuelPanier.contientIconeSuppression}>
            <img onClick={() => retirerArticle(index)} src={supprimer} alt="supprimer un article du panier" />
          </div>
        </div>
      ))}
      <div className={visuelPanier.contientBoutonCommande}>
        <Link to={{ pathname: "/commande" }}><button className={visuelPanier.boutonPasserCommande}>Passer la commande</button></Link>
      </div>
    </section>

  );
};

export default PanierTotal;
