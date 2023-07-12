import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from "./popups/EditProfilePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import DeletePlacePopup from "./popups/DeletePlacePopup";
import ImagePopup from './ImagePopup';
import InfoTooltip from "./popups/InfoTooltip";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from '../utils/Api';
import { auth } from "../utils/Auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import ProtectedRoute from "./ProtectedRoute";
import MobileMenu from "./MobileMenu";

function App() {
  const [currentUser, setUserData] = React.useState({});
  const [cardsList, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = React.useState("");
  function handleSetUserEmail(email) {
    setUserEmail(email);
  }

  function handleTokenCheck() {
    auth.checkToken()
        .then(res => res.json())
        .then(res => {
          if (res) {
            setLoggedIn(true);
            handleSetUserEmail(res.email);
            navigate("/", {replace: true});
          }
        })
        .catch(err => console.log(`Ошибка проверки токена: ${err}`));
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  React.useEffect(() => {
    loggedIn && Promise.all([api.getUserDataFromServer(), api.getCardFromServer()])
      .then(([userData, cards]) => {
          setUserData(userData);
          setCards(cards.reverse());
    })
      .catch(err => console.log(err));
  }, [loggedIn]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  function handleDeletePlaceClick(link) {
    setIsDeletePlacePopupOpen(true);
    setSelectedCardData(link);
  }

  const [ImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCardData] = React.useState({name: '', link: ''});
  function handleCardClick(link) {
    setIsImagePopupOpen(true);
    setSelectedCardData(link);
  }

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  function handleOpenInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(true);
  }

  const [serverCallbackStatus, setServerCallbackStatus] = React.useState(false);
  function handleSetServerCallbackStatus(res) {
    setServerCallbackStatus(res.ok);
  }

  const [isHeaderMobileMenuOpen, setIsHeaderMobileMenuOpen] = React.useState(false);

  function tuggleHeaderMobileMenu() {
    setIsHeaderMobileMenuOpen(!isHeaderMobileMenuOpen)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCardData({name: '', link: ''});
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewPlaceToServer(newCard)
      .then((newCard) => {
        setCards([newCard, ...cardsList])
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка добавления нового места: ${err.status}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i.toString() === currentUser._id);
    console.log(card);
    console.log(isLiked);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
      })
      .catch(err => console.log(`Ошибка при добавлении лайка: ${err.status}`));
  }

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка удаления карточки с сервера: ${err.status}`));
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(() => {
        return api.getUserDataFromServer();
      })
      .then((userData) => {
        setUserData(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка изменения данных о пользователе: ${err.status}`));
  }

  function handleUpdateAvatar(link) {
    api.handleChangeAvatar(link)
      .then((userData) => {
        setUserData(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка изменения аватара: ${err.status}`));
  }

  function handleRegisterSubmit(email, password) {
    auth.addNewUserToServer(email, password)
      .then((res) =>{
        handleSetServerCallbackStatus(res);
        handleOpenInfoTooltipPopup();
      })
      .catch(err => {
        handleSetServerCallbackStatus(err);
        handleOpenInfoTooltipPopup();
        console.log(`Ошибка добавления нового пользователя на сервер: ${err.status}`);
      });
  }

  function handleLogInSubmit(email, password) {
    auth.handleUserAuthorization(email, password)
      .then((res => res.json()))
      .then((data) =>{
        if (data){
          setLoggedIn(true);
          navigate("/", {replace: true});
          setIsHeaderMobileMenuOpen(false);
          handleSetUserEmail(email);
          return data;
        }
      })
      .catch(err => {
        handleSetServerCallbackStatus(err);
        handleOpenInfoTooltipPopup();
        console.log(`Ошибка входа пользователя: ${err}`);
      });
  }

  function handleSignOut() {
    auth.logout();
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <MobileMenu
            loggedIn={loggedIn}
            handleSignOut={handleSignOut}
            email={userEmail}
            isHeaderMobileMenuOpen={isHeaderMobileMenuOpen}
          />
          <Header
            loggedIn={loggedIn}
            handleSignOut={handleSignOut}
            email={userEmail}
            isHeaderMobileMenuOpen={isHeaderMobileMenuOpen}
            onHeaderMenuButton={tuggleHeaderMobileMenu}
          />
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLikeClick={handleCardLike}
                onCardDeleteClick={handleDeletePlaceClick}
                cardsList={cardsList}
                element={Main}
                loggedIn={loggedIn}
              />}
            />
            <Route
              path="/signin"
              element={
                <AuthForm 
                  onSubmit={handleLogInSubmit} 
                  formName="Вход" 
                  btnText="Войти" 
                  afterWords="Ещё не зарегистрированы?&nbsp;"
                  linkText="Регистрация"
                  link="/signup"
                />}
            />
            <Route
              path="/signup"
              element={
                <AuthForm 
                  onSubmit={handleRegisterSubmit} 
                  formName="Регистрация" 
                  btnText="Зарегистрироваться"
                  afterWords="Уже зарегистрированы?&nbsp;"
                  linkText="Войти"
                  link="/signin"
                /> }
            />
          </Routes>
          {loggedIn && (
          <>
            <Footer/>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <DeletePlacePopup
              isOpen={isDeletePlacePopupOpen}
              onClose={closeAllPopups}
              onDeletePlace={handleCardDelete}
              card={selectedCard}
            />
            <ImagePopup
              isOpen={ImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}
            />
          </>
          )}
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            serverCallbackStatus={serverCallbackStatus}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;