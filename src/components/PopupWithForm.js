import React from "react";

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <form className="popup__form" onSubmit={props.onSubmit}>
        <button type="button" className="popup__close" onClick={props.onClose} />
        <h2 className="popup__heading">{props.title}</h2>
        {props.children}
        <button className={`popup__save ${props.isActive ? "" : "popup__save_inactive" }`}>{props.buttonText}</button>
      </form>
    </section>
  );
}

export default PopupWithForm;