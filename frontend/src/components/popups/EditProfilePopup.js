import PopupWithForm from '../PopupWithForm'
import EditProfilePopupInput from '../popupsInput/EditProfilePopupInput';
import React from "react";
import { useForm } from '../../hooks/useForm';
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        if (currentUser.name) {
            userName.setValues(currentUser.name);
            userDescription.setValues(currentUser.about);
        }
    }, [currentUser, isOpen]);

    const userName = useForm("");
    const userDescription = useForm("")


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: userName.values,
          about: userDescription.values,
        });
    } 
    
    return (
        <PopupWithForm 
          title="Редактировать профиль" 
          isOpen={isOpen} 
          onClose={onClose}
          name="change-profile"
          onSubmit={handleSubmit}
          buttonText="Сохранить"
        >
            <EditProfilePopupInput 
                userName={userName.values} 
                handleChangeName={userName.handleChange} 
                userDescription={userDescription.values} 
                handleChangeDescription={userDescription.handleChange}
            />
        </PopupWithForm>
    )
}