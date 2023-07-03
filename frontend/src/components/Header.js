import { useLocation, NavLink } from 'react-router-dom';
import logo from '../images/header__logo.svg';
import closeButton from "../images/edit-form_close_button.svg";
import headerButton from "../images/header__button_false.svg";
import React from 'react';

export default function Header({loggedIn, email, handleSignOut, isHeaderMobileMenuOpen, onHeaderMenuButton}) {
  const path = useLocation().pathname;

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип 'Mesto'"/>

      {loggedIn ? (
        <>
          <div className='header__menu'>
            <p className='header__email'>{email}</p>
            <p className='header__link_type_out' onClick={handleSignOut}>Выйти</p>
          </div>
          <button className="header__button" 
          style={{
            backgroundImage: `url(${
              isHeaderMobileMenuOpen ? closeButton : headerButton 
            })`,
          }}
            onClick={onHeaderMenuButton}
          />
        </>
      ) : (
        path === "/signin" ? 
          (
          <NavLink to="/signup" className='header__link'>
            Регистрация
          </NavLink>
        ) : (
          <NavLink to="/signin" className='header__link'>
            Войти
          </NavLink>
        )
      )}
    </header>
  )
}