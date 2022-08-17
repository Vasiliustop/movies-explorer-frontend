import "./Profile.css";
import React from "react";
import Header from "../Header/Header";
import {Link, useNavigate} from "react-router-dom";
import {CurrentUserContext} from '../../context/CurrentUserContext';
import InfoToolTip from "../InfoTooltip/InfoTooltip";
import validator from "validator";

function Profile({onLogout, onSubmit, currentUser}) {
    const [userName, setUserName] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [isValidName, setIsValidName] = React.useState(true);
    const [isValidEmail, setIsValidEmail] = React.useState(true);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const history = useNavigate();

    function handleChangeName(e) {
        const input = e.target;
        setUserName(input.value);
        setIsValidName(e.target.validity.valid);
    }

    function handleChangeEmail(e) {
        const input = e.target;
        setUserEmail(input.value);
        setIsValidEmail(e.target.validity.valid && validator.isEmail(e.target.value));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({email: userEmail, name: userName});
        setIsInfoTooltipOpen(true);
    }

    function handleClose() {
        setIsInfoTooltipOpen(false);
        history('/profile');
    }

    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserEmail(currentUser.email);
    }, [currentUser]);

    React.useEffect(() => {
        const editButton = document.querySelector(".profile__edit-button");
        if (((userName !== currentUser.name) || (userEmail !== currentUser.email))
            &&isValidName && isValidEmail){
            editButton.classList.remove("profile__edit-button_disabled");
        } else {
            editButton.classList.add("profile__edit-button_disabled");
        }
    }, [currentUser, userName, userEmail, isValidEmail, isValidName]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header loggedIn={true}/>
            <main className="profile">
                <div className="profile__container">
                    <h1 className="profile__heading">Привет, {userName}!</h1>
                    <form className="profile__form" onSubmit={handleSubmit}>
                        <div className="profile__input-container">
                            <label className="profile__lable">Имя</label>
                            <input
                                className="profile__input"
                                type="text"
                                name="name"
                                minLength="2"
                                maxLength="40"
                                required
                                value={userName || ''}
                                onChange={handleChangeName}
                            />
                        </div>
                        <div className="profile__input-container">
                            <label className="profile__lable">E-mail</label>
                            <input
                                className="profile__input"
                                type="email"
                                name="email"
                                minLength="2"
                                maxLength="40"
                                required
                                value={userEmail || ''}
                                onChange={handleChangeEmail}
                            />
                        </div>
                        <button type="submit"
                                onSubmit={onSubmit}
                                className="profile__edit-button profile__edit-button_disabled">
                            Редактировать
                        </button>
                    </form>
                    <Link to="/signin" onClick={onLogout} className="profile__logout">
                        Выйти из аккаунта
                    </Link>
                </div>
                <InfoToolTip
                    status={true}
                    isOpen={isInfoTooltipOpen}
                    closePopup={handleClose}/>
            </main>
        </CurrentUserContext.Provider>
    )
}

export default Profile;