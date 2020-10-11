import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import "../index.css";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setIsImagePopupOpen] = React.useState({});
  const [active] = React.useState(true)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen({});
  }

  return (
    <div className="root">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
        isActive={active}
        >
          <fieldset className="popup__fieldset">
            <label className="popup__field">
              <input required="" maxLength="40" minLength="2" type="text" className="popup__input" placeholder="Имя" id="name" />
              <span id="name-error" className="popup__input-error"></span>
            </label>
            <label className="popup__field">
              <input required="" maxLength="200" minLength="2" type="text" className="popup__input" placeholder="Род занятий" id="job" />
              <span id="job-error" className="popup__input-error"></span>
            </label>
          </fieldset>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Создать"
      >
          <fieldset className="popup__fieldset">
            <label className="popup__field">
              <input required="" maxLength="30" minLength="1" type="text" className="popup__input" placeholder="Название" id="place" />
              <span id="place-error" className="popup__input-error"></span>
            </label>
            <label className="popup__field">
              <input required="" type="url" className="popup__input" placeholder="Ссылка на картинку" id="place-img" />
              <span id="place-img-error" className="popup__input-error"></span>
            </label>
          </fieldset>          
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        onClose={closeAllPopups}
        buttonText="Да"
        isActive={active}
      >
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
          <fieldset className="popup__fieldset">
            <label className="popup__field">
              <input required="" type="url" className="popup__input" placeholder="Ссылка на аватар" id="avatar" />
              <span id="avatar-error" className="popup__input-error"></span>
            </label>
          </fieldset>  
      </PopupWithForm>
    </div>
  );
}

export default App;
