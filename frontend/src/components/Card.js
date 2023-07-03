import { CurrentUserContext } from "../context/CurrentUserContext";
import React from "react";

export default function Card({card, onCardClick, onCardLikeClick, onCardDeleteClick}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like-btn ${isLiked && "element__like-btn_active"}`
      );; 
    
    function handleCardClick() {
        onCardClick(card);
    } 

    function handleCardLikeClick() {
        onCardLikeClick(card);
    }
    
    function handleCardDeleteClick() {
        onCardDeleteClick(card);
    }
    return (
        <li className="element">
            <img 
                className="element__photo" 
                src={card.link} 
                onClick={handleCardClick} 
                alt={card.name}
            />
            {isOwn && <button className='element_delete_button' onClick={handleCardDeleteClick} />}
            <div className="element__rectangle">
                <h2 className="element__title">{card.name}</h2>
                <div className="button-container">
                    <button 
                        className={cardLikeButtonClassName} 
                        onClick={handleCardLikeClick} 
                        type="button"
                    />
                    <p className="button-container__count">
                        {card.likes.length}
                    </p>
                </div>
            </div>
        </li>
    )
}