import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `photo-grid__delete-button ${
    isOwn ? "" : "photo-grid__delete-button_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo-grid__like-button ${
    isLiked ? "photo-grid__like-button_liked" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="photo-grid__element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}></button>
      <figure className="photo-grid__figure">
        <img className="photo-grid__img" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
        <figcaption className="photo-grid__textblock">
          <p className="photo-grid__text">{props.card.name}</p>
          <div className="photo-grid__likeblock">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLike}></button>
            <p className="photo-grid__like-counter">{props.card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}