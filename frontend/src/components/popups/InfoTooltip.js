import React from "react";
import tooltipImageSuccess from '../../images/popup__tooltip-image_success.svg'

import tooltipImageFailed from '../../images/popup__tooltip-image_failed.svg'

export default function InfoTooltip({isOpen, onClose, serverCallbackStatus}) {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`} id={`popup__info-tooltip}`}>
            <div className="popup__container">
                <button className="popup__close-btn" type="button" onClick={onClose}/>
                <img 
                    className="popup__tooltip-image" 
                    src={serverCallbackStatus ? tooltipImageSuccess : tooltipImageFailed} 
                    alt="Вы успешно зарегистрировалить!"
                />
                <h2 className="popup__tooltip-header">{serverCallbackStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </div>
    )
}