import React from "react";
import { Link } from "react-router-dom";

function Register({onRegisterSubmit}) {
  function handleSubmit(e) {
    e.preventDefault();
    onRegisterSubmit(
      userEmail, userPassword
    );
  }
  
  const [userEmail, setUserEmail] = React.useState(" ");
  function handleChangeEmail(e) {
      setUserEmail(e.target.value);
  }

  const [userPassword, setUserPassword] = React.useState(" ");
  function handleChangeUserPassword(e) {
    setUserPassword(e.target.value);
  }

  return (
    <main className="content">
      <section className="register">
        <h1 className="register__header">Регистрация</h1>
        <form 
          className="register__form"
          onSubmit={handleSubmit}
        >
          <input 
            required 
            minLength="2" 
            maxLength="30" 
            type="text" 
            id="email"
            className="register__input"
            placeholder="Email"
            value={userEmail}
            onChange={handleChangeEmail}
          />
          <input 
            required 
            minLength="2" 
            maxLength="30" 
            type="password" 
            id="password"
            className="register__input"
            placeholder="Пароль" 
            value={userPassword}
            onChange={handleChangeUserPassword}
          />
          <button 
            className="register__submit" 
            type="submit"
          >
            Зарегистрироваться
          </button>
          <div className="register__afterword">
            <p className="register__text">Уже зарегистрированы?&nbsp;</p>
            <Link className="register__link" to={"/signin"}>
              Войти
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
  
export default Register;