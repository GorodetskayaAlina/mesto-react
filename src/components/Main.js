import React from "react";
import Card from './Card';
import { CurrentUserContext } from "./contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
                <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__button-edit hover" type="button" onClick={onEditProfile}>
                    </button>
                    <p className="profile__activity">{currentUser.about}</p>
                </div>
                <button className="profile__button-refill hover" type="button" onClick={onAddPlace}>
                </button>
            </section>
            <section className="grid">
                {cards.map((card) => <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
            </section>
        </main>
    )
}

export default Main;