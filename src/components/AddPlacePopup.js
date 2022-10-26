import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function cardNameHandleChange(e) {
        setName(e.target.value);
    }

    function cardLinkHandleChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name, link
        });
    }

    return (
        <PopupWithForm name='refill'
            isOpen={isOpen}
            onClose={onClose}
            title='Новое место'
            button='Создать'
            children={
                <fieldset className="popup__contact-info" name="profile">
                    <label className="popup__label">
                        <input id="cardname" type="text" name="cardname" value={name || ''} onChange={cardNameHandleChange}
                            className="popup__form-item popup__form-item_refill-card-name" placeholder="Название"
                            minLength="2" maxLength="30" required />
                        <span id="cardname-error" className="popup__error"></span>
                    </label>
                    <label className="popup__label">
                        <input id="cardurl" type="url" name="cardurl" value={link || ''} onChange={cardLinkHandleChange}
                            className="popup__form-item popup__form-item_refill-card-url"
                            placeholder="Ссылка на картинку" required />
                        <span id="cardurl-error" className="popup__error"></span>
                    </label>
                </fieldset>
            }
            onSubmit={handleSubmit}
        />
    )
}

export default AddPlacePopup;