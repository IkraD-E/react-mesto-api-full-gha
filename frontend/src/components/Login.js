import React from "react";

function Login({onLoggedInSubmit}) {

    function handleSubmit(e) {
      e.preventDefault();
      onLoggedInSubmit(
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
          <section className="login">
            <h1 className="login__header">Вход</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <input 
                    required 
                    minLength="2" 
                    maxLength="30" 
                    type="text" 
                    id="email"
                    className="login__input login__input_type_email"
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
                    className="login__input login__input_type_password"
                    placeholder="Пароль" 
                    value={userPassword}
                    onChange={handleChangeUserPassword}
                />
                <button 
                    className="login__submit" 
                    type="submit"
                >
                    Войти
                </button>
            </form>
          </section>
  
        </main>
    )
}
  
export default Login;