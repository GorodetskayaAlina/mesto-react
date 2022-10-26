import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatar.current.value
        });
    }

    return (
        <PopupWithForm name='avatar'
            isOpen={isOpen}
            onClose={onClose}
            title='Обновить аватар'
            button='Сохранить'
            children={
                <fieldset className="popup__contact-info" name="profile">
                    <label className="popup__label">
                        <input id="avatar" type="url" name="avatar" ref={avatar}
                            className="popup__form-item" placeholder="Ссылка" required />
                        <span id="avatar-error" className="popup__error"></span>
                    </label>
                </fieldset>
            }
            onSubmit={handleSubmit}
        />
    )
}

export default EditAvatarPopup;
