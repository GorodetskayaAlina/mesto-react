import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, userName, userDescription, userAvatar, cards, onCardClick}) {
    return (
        <main className="content">
            <section className="profile">
                <img src={userAvatar} alt="Фото профиля" className="profile__avatar" />
                <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__button-edit hover" type="button" onClick={onEditProfile}>
                    </button>
                    <p className="profile__activity">{userDescription}</p>
                </div>
                <button className="profile__button-refill hover" type="button" onClick={onAddPlace}>
                </button>
            </section>
            <section className="grid">
                {cards.map((card) => <Card card={card} key={card._id} onCardClick={onCardClick}/>)}
            </section>
        </main>
    )
}

export default Main;