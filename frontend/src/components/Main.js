import Card from './Card';
import React from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLikeClick, onCardDeleteClick, cardsList}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-wrap">
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар"/>
            <button className="profile__edit-button-avatar" type="button" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__header">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>

        <section className="elements" aria-label="places">
          <ul className="elements__list">
            {cardsList.map((card) => (
              <Card 
                card={card} 
                onCardClick={onCardClick}
                key={card._id}
                onCardLikeClick={onCardLikeClick}
                onCardDeleteClick={onCardDeleteClick}
              />
            ))}
          </ul>
        </section>
      </main>
  )
}

export default Main;