function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup-card ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close hover popup__close-img" type="button" onClick={onClose}></button>
                <img className="popup-card__body" alt={`${card.name}`} src={`${card.link}`} />
                <h2 className="popup-card__title">{`${card.name}`}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;