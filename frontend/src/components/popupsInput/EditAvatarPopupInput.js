import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function EditAvatarPopupInput({imageRef}) {
    // const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

    return (
        <>
            <input
                required
                type="url" 
                name="link" 
                id="avatar-source" 
                placeholder="Ссылка на картинку" 
                className="popup__input popup__input_type_image-source popup__input"
                defaultValue=""
                ref={imageRef}
            />
            <span className={`popup__error avatar-source-error`}></span>
        </>
    )
}