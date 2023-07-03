import PopupWithForm from '../PopupWithForm'
import AddPlacePopupInput from '../popupsInput/AddPlacePopupInput';
import { useForm } from '../../hooks/useForm';
import React from "react";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const cardName = useForm("");
    const cardUrl = useForm("");
    React.useEffect(() => {
        cardName.setValues("");
        cardUrl.setValues("");
    }, [isOpen]);
    
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name: cardName.values,
          link: cardUrl.values,
        });
    };
    return (
        <PopupWithForm 
            title="Новое место" 
            isOpen={isOpen} 
            onClose={onClose}
            name="add-place"
            onSubmit={handleSubmit}
            buttonText="Создать" 
        >
            <AddPlacePopupInput 
                handleChangeName={cardName.handleChange} 
                cardName={cardName.values} 
                handleChangeUrl={cardUrl.handleChange} 
                cardUrl={cardUrl.values}
            />
        </PopupWithForm>
    )
}