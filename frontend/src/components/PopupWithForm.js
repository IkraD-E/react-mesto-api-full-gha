export default function PopupWithForm({
    isOpen, 
    onClose, 
    name, 
    title, 
    children,
    buttonText,
    onSubmit})
    {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`} id={`popup__${name}`}>
            <div className="popup__container">
                <button className="popup__close-btn" type="button" onClick={onClose}/>
                <h2 className="popup__header">{title}</h2>
                <form className="popup__form" name={`form__${name}`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__button" type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}