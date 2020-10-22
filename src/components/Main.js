import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}></div>
        <div className="profile__info">
         <div className="profile__nameholder">
            <p className="profile__name">{currentUser.name}</p>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
         </div>
         <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
       <ul className="photo-grid">
       {props.cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          ))}
       </ul>
      </section>
    </main>
    )
}

export default Main;