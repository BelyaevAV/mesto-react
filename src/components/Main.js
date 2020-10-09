import React from "react";
import Card from "./Card";
import api from "../utils/api";


function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setInitialCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, data]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setInitialCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} onClick={props.onEditAvatar}></div>
        <div className="profile__info">
         <div className="profile__nameholder">
            <p className="profile__name">{userName}</p>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
         </div>
         <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
       <ul className="photo-grid">
       {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} />
          ))}
       </ul>
      </section>
    </main>
    )
}

export default Main;