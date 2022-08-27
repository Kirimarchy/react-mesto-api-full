import React, { useState } from 'react';
import PopupWithForm from "../PopupWithForm";
import currentUserContext from "../../contexts/CurrentUserContext"
//На этот раз вместо управляемых компонентов используйте реф,
// чтобы получить прямой доступ к DOM-элементу инпута и его значению.
const EditAvatarPopup = (props) => {
    const [imageLink, setImageLink] = useState('');
    const currentUser = React.useContext(currentUserContext);

    function handleSubmit(e) {
        e.preventDefault();// Не забудьте обновлять аватар локально после завершения запроса.
        props.onUpdateAvatar({
            avatar: imageLink, // Значение инпута, полученное с помощью рефа */,
        });
    }

    React.useEffect(() => {
        setImageLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="avatar" title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={() => props.onClose()}
            handleSubmit={(e) => handleSubmit(e)}
            buttonTitle={'Сохранить'}
        >
            <label className="popup__field">
                <input
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    type="url"
                    className="popup__input popup__input_avatar"
                    id="avatar"
                    name="avatar"
                    required
                    placeholder="Ссылка на картинку"
                />
                <span className="popup__error" id="avatarError" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup