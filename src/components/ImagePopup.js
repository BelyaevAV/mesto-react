import React from "react";

function ImagePopup(props) {
  return (
    <section className={`popup popup_type_photo ${props.card.link ? "popup_opened" : ""}`}>
    <div className="popup__photo">
      <figure className="popup__figure">
        <button type="button" className="popup__close" onClick={props.onClose}/>
        <img className="popup__full-img" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__full-text">{props.card.name}</figcaption>
      </figure>
    </div>
    </section>
  );
}

export default ImagePopup;