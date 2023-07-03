export default function AddPlacePopupInput({handleChangeName, handleChangeUrl, cardName, cardUrl}) {

    return (
        <>
            <input 
                required 
                minLength="2" 
                maxLength="30" 
                type="text" 
                name="name" 
                id="place-name"
                value={cardName}
                placeholder="Название" 
                className="popup__input popup__input_type_place-name popup__input"
                onChange={handleChangeName}
            />
            <span className="popup__error place-name-error"></span>
            <input 
                required 
                type="url" 
                name="link" 
                id="place-source" 
                value={cardUrl}
                placeholder="Ссылка на картинку" 
                className="popup__input popup__input_type_image-source popup__input"
                onChange={handleChangeUrl}
            />
            <span className="popup__error place-source-error"></span>
        </>
    )
}