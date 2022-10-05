import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import avatar from '../images/avatar.jpg';
import '../index.css';

function App() {
    // открытие и закрытие попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    };

    //загрузка начальных данных профиля
    const [userName, setUserName] = React.useState('Жак-Ив Кусто');
    const [userDescription, setUserDescription] = React.useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = React.useState(avatar);

    //загрузка начальных карточек
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, card]) => {
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(card);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }, []);

    //попап с увеличенной картинкой карточки
    const [selectedCard, setSelectedCard] = React.useState({});
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    return (
        <div>
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                userName={userName}
                userDescription={userDescription}
                userAvatar={userAvatar}
                cards={cards}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm name='edit'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                title='Редактировать профиль'
                button='Сохранить'
                children={
                    <fieldset className="popup__contact-info" name="profile">
                        <label className="popup__label">
                            <input id="profilename" type="text" name="profilename"
                                className="popup__form-item popup__form-item_user-info_name" placeholder="Имя" minLength="2"
                                maxLength="40" required />
                            <span id="profilename-error" className="popup__error"></span>
                        </label>
                        <label className="popup__label">
                            <input id="profilejob" type="text" name="profilejob"
                                className="popup__form-item popup__form-item_user-info_job" placeholder="О себе"
                                minLength="2" maxLength="200" required />
                            <span id="profilejob-error" className="popup__error"></span>
                        </label>
                    </fieldset>
                }
            />

            <PopupWithForm name='refill'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                title='Новое место'
                button='Создать'
                children={
                    <fieldset className="popup__contact-info" name="profile">
                        <label className="popup__label">
                            <input id="cardname" type="text" name="cardname"
                                className="popup__form-item popup__form-item_refill-card-name" placeholder="Название"
                                minLength="2" maxLength="30" required />
                            <span id="cardname-error" className="popup__error"></span>
                        </label>
                        <label className="popup__label">
                            <input id="cardurl" type="url" name="cardurl"
                                className="popup__form-item popup__form-item_refill-card-url"
                                placeholder="Ссылка на картинку" required />
                            <span id="cardurl-error" className="popup__error"></span>
                        </label>
                    </fieldset>
                }
            />

            <PopupWithForm name='avatar'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                title='Обновить аватар'
                button='Сохранить'
                children={
                    <fieldset className="popup__contact-info" name="profile">
                        <label className="popup__label">
                            <input id="avatar" type="url" name="avatar"
                                className="popup__form-item" placeholder="Ссылка" required />
                            <span id="avatar-error" className="popup__error"></span>
                        </label>
                    </fieldset>
                }
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />


            <div className="popup popup-card">
                <div className="popup__container">
                    <button className="popup__close hover popup__close-img" type="button"></button>
                    <img className="popup-card__body" alt="" src="#" />
                    <h2 className="popup-card__title"></h2>
                </div>
            </div>

            <div className="popup popup-confirmation">
                <div className="popup__container">
                    <button className="popup__close hover popup-confirmation__close" type="button"></button>
                    <div className="popup__body popup-confirmation__body">
                        <h2 className="popup__title popup-confirmation__title">Вы уверены?</h2>
                        <button className="popup__save popup-confirmation__save" type="button">Да</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;