import React from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const handleClick = () => {
        onCardClick(card);
    }

    const currentUser = React.useContext(CurrentUserContext);

    // определяем, кто загружал карточку
    const isOwn = card.owner._id === currentUser._id;
    //определяем, ставил ли пользователь лайк
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card._id);
    };

    return (
        <article className="card" >
            <button className="card__button-delete hover" type="button" style={{ display: isOwn ? 'block' : 'none' }} onClick={handleDeleteClick}></button>
            <img src={`${card.link}`} alt={`${card.name}`} className="card__image" onClick={handleClick} />
            <div className="card__description">
                <h2 className="card__name">{card.name}</h2>
                <div className="card__like">
                    <button className={`card__button-like ${isLiked ? 'card__button-like_active' : ''}`} onClick={handleLikeClick} type="button"></button>
                    <p className="card__sum-like">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;

