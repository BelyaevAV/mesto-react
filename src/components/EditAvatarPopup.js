import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser]);

  return (
    <PopupWithForm
    title="Обновить аватар"
    name="avatar"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    isLoading={props.isLoading}
    buttonText="Сохранить"      >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input required ref={avatarRef} type="url" className="popup__input" placeholder="Ссылка на аватар" id="avatar" />
          <span id="avatar-error" className="popup__input-error"></span>
        </label>
      </fieldset>  
  </PopupWithForm>
  );
}