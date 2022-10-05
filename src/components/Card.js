function Card({ card, onCardClick }) {
    const handleClick = () => {
        onCardClick(card);
    }

    return (
        <article className="card" >
            <button className="card__button-delete hover" type="button"></button>
            <img src={`${card.link}`} alt={`${card.name}`} className="card__image" onClick={handleClick} />
            <div className="card__description">
                <h2 className="card__name">{card.name}</h2>
                <div className="card__like">
                    <button className="card__button-like" type="button"></button>
                    <p className="card__sum-like">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;

