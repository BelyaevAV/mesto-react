import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from "../utils/api";

import "../index.css";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setIsImagePopupOpen] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState({});

  function userInfo(user) {
    setCurrentUser(user);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLike(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    })
    .catch((err) => console.log(err));
    }

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);
        userInfo(user);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser(user) {
    setLoading(true);
    api.editProfile(user.name, user.about)
      .then((user) => {
        userInfo(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);

      });
  }

  function handleUpdateAvatar(data) {
    setLoading(true);
    api.editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);

      });
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleConfirmSubmit() {
    setLoading(true);
    api.deleteCard(cardDelete._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardDelete._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);

      });
  }

  function handleAddPlaceSubmit(item) {
    setLoading(true);
    api.addNewCard(item)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);

      });
  }

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
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen({});
  }

  return (
    
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleConfirmSubmit}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
        />
       </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
