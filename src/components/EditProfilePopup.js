import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('Жак-Ив Кусто');
  const [description, setDescription] = React.useState('Исследователь океана');
  const currentUser = React.useContext(CurrentUserContext);

  function nameHandleChange(e) {
    setName(e.target.value);
  }

  function descriptionHandleChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='edit'
      isOpen={isOpen}
      onClose={onClose}
      title='Редактировать профиль'
      button='Сохранить'
      children={
        <fieldset className="popup__contact-info" name="profile">
          <label className="popup__label">
            <input id="profilename" type="text" name="profilename" value={name || ''} onChange={nameHandleChange}
              className="popup__form-item popup__form-item_user-info_name" placeholder="Имя" minLength="2"
              maxLength="40" required />
            <span id="profilename-error" className="popup__error"></span>
          </label>
          <label className="popup__label">
            <input id="profilejob" type="text" name="profilejob" value={description || ''} onChange={descriptionHandleChange}
              className="popup__form-item popup__form-item_user-info_job" placeholder="О себе"
              minLength="2" maxLength="200" required />
            <span id="profilejob-error" className="popup__error"></span>
          </label>
        </fieldset>
      }
      onSubmit={handleSubmit}
    />
  )
}

export default EditProfilePopup;