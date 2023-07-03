import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function AuthForm({onSubmit, formName, btnText}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(
      userEmail.values, userPassword.values
    );
  }
  const userEmail = useForm("");
  const userPassword = useForm("");
  

  return (
    <main className="content">
      <section className="auth">
        <h1 className="auth__header">{formName}</h1>
        <form 
          className="auth__form"
          onSubmit={handleSubmit}
        >
          <input 
            required 
            minLength="2" 
            maxLength="30" 
            type="text" 
            id="email"
            className="auth__input"
            placeholder="Email"
            value={userEmail.values}
            onChange={userEmail.handleChange}
          />
          <input 
            required 
            minLength="2" 
            maxLength="30" 
            type="password" 
            id="password"
            className="auth__input"
            placeholder="Пароль" 
            value={userPassword.values}
            onChange={userPassword.handleChange}
          />
          <button 
            className="auth__submit" 
            type="submit"
          >
            {btnText}
          </button>
          <div className="afterwords">
            <p className="afterwords__text">Уже зарегистрированы?&nbsp;</p>
            <Link className="afterwords__link" to={"/signin"}>
              Войти
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
  
export default AuthForm;