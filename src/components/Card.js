import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="photo-grid__element">
      <button className="photo-grid__delete-button" type="button"></button>
      <figure className="photo-grid__figure">
        <img className="photo-grid__img" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
        <figcaption className="photo-grid__textblock">
          <p className="photo-grid__text">{props.card.name}</p>
          <div className="photo-grid__likeblock">
            <button className="photo-grid__like-button" type="button"></button>
            <p className="photo-grid__like-counter">{props.card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;