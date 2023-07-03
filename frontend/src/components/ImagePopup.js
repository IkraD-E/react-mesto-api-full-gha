export default function ImagePopup({isOpen, onClose, card}) {
    return (
        <div className={`popup popup_type_image ${isOpen && "popup_opened"}`} id="popup__image">
            <figure className="popup__figure">
                <button className="popup__close-btn" type="button" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name}/>
                <figcaption className="popup__image-header">{card.name}</figcaption>
            </figure>
        </div>
    )
}