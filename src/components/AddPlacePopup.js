import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({name, link});
    setName('');
    setLink('');
  }

  return (
  <PopupWithForm
    title="Новое место"
    name="add"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    isLoading={props.isLoading}
    buttonText="Создать"
  >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input onChange={handleChangeName} required maxLength="30" minLength="1" type="text" className="popup__input" placeholder="Название" id="place" />
          <span id="place-error" className="popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input onChange={handleChangeLink} required type="url" className="popup__input" placeholder="Ссылка на картинку" id="place-img" />
          <span id="place-img-error" className="popup__input-error"></span>
        </label>
      </fieldset>          
  </PopupWithForm>
  );
}