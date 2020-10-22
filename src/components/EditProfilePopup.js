import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    
  <PopupWithForm
    title="Редактировать профиль"
    name="edit"
    isOpen={props.isOpen}
    onClose={props.onClose}
    buttonText="Сохранить"
    onSubmit={handleSubmit}
    isLoading={props.isLoading}
  >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input required="" maxLength="40" minLength="2" type="text" className="popup__input" placeholder="Имя" id="name" onChange={handleChangeName} value={name ? name : ""} />
          <span id="name-error" className="popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input required="" maxLength="200" minLength="2" type="text" className="popup__input" placeholder="Род занятий" id="job" onChange={handleChangeDescription} value={description ? description : ""} />
          <span id="job-error" className="popup__input-error"></span>
        </label>
      </fieldset>
  </PopupWithForm>
  );
}