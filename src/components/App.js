import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {
    //попапы
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    //загрузка начальных данных профиля
    const [currentUser, setCurrentUser] = React.useState({});

    //загрузка начальных карточек
    const [cards, setCards] = React.useState([]);

    // открытие и закрытие попапов
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    };

    //добавление новых карточек 
    function handleAddPlaceSubmit({ name, link }) {
        // запрос в API и обновление карточки
        api.createNewCards(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    //реализация лайков
    function handleCardLike(card) {
        //определяем, ставил ли пользователь лайк
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // запрос в API и обновление карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    //удаление карточки 
    function handleCardDelete(deletedCard) {
        // запрос в API и обновление карточки
        api.deleteCardItem(deletedCard)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== deletedCard));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    //попап с увеличенной картинкой карточки
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, card]) => {
                setCurrentUser(user);
                setCards(card);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }, []);

    //Обновление информации о пользователе
    const handleUpdateUser = ({ name, about }) => {
        api.updateUserInfo(name, about)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    //Обновление аватара
    const handleUpdateAvatar = ({ avatar }) => {
        api.getProfileAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;