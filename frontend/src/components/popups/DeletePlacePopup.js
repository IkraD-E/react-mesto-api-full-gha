import PopupWithForm from '../PopupWithForm'

export default function DeletePlacePopup({isOpen, onClose, onDeletePlace, card}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace(card);
  }
  
  return (
      <PopupWithForm 
        isOpen={isOpen} 
        onClose={onClose}
        title="Вы уверены?"
        name="delete-image"
        onSubmit={handleSubmit}
        buttonText="Да"
      >
      </PopupWithForm>
  )
}