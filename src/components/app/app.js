import React from "react";
import { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as Auth from "../../utils/Auth";
import * as MainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import Popup from "../Popup/Popup";



export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  const history = useHistory();

  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [searchForm, setSearchForm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [nameProfile, setNameProfile] = useState("");
  const [emailProfile, setEmailProfile] = useState("");
  const [formValidProfile, setFormValidProfile] = useState(false);
  const [searchFormDirty, setSearchFormDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);
  
  async function handleSearchCard() {
    setLoading(true);
    return await MoviesApi.getInitialMovies()

      .then((cards) => {
        setCards(cards);
      })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getSavedCard() {
    MainApi.getSavedMovies()
    .then((res) => {
      setSavedCards(res)
      localStorage.setItem(
        "saveMoooovie",
        JSON.stringify({ res })
      );
    })
      .catch((e) => {
        throw e;
      });
  }

  function deleteCard(card) {
    MainApi.deleteMovie(card._id).then((e) =>
      setSavedCards((state) =>
        state.reduce((acc, value) => {
          if (value._id === card._id) {
            return acc;
          } else {
            return acc.concat(value);
          }
        }, [])
      )
    );
  }

  function handleCardLike(card) {
    const isLiked = savedCards.some(
      (elem) => currentUser.id === elem.owner && elem.movieId === card.id
    );
    const cardDelete = savedCards.filter(
      (value) => value.movieId === card.id && value._id
    );
    const promise = isLiked
      ? MainApi.deleteMovie(cardDelete[0]._id)
      : MainApi.saveMovie(card);
    promise
      .then((newCard) => {
        setSavedCards((state) => {
          if (newCard.owner) {
            return [...state, ...[newCard]];
          } else {
            return state.reduce((acc, value) => {
              if (value._id === cardDelete[0]._id) {
                return acc;
              } else {
                return acc.concat(value);
              }
            }, []);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      MoviesApi.getInitialMovies()
        .then(setCards)
        .catch((e) => console.log(e));
      MainApi.getSavedMovies()
      .then((res) => {
        setSavedCards(res)
        localStorage.setItem(
          "saveMoooovie",
          JSON.stringify(res)
        );
      })
        .catch((e) => console.log(e));
    }
  }, [isLoggedIn, location]);

  function handlerSearchForm(e, route) {
    setSearchForm(e.target.value);

    if (route === "/movies") {
      localStorage.setItem(
        "searchForm",
        JSON.stringify({ searchForm: e.target.value })
      );
    }
    if (route === "/saved-movies") {
      localStorage.setItem(
        "searchFormSavedMovies",
        JSON.stringify({ searchFormSavedMovies: e.target.value })
      );
    }
  }

  const handleRegister = (name, email, password) => {
    Auth.register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleLogin = (email, password) => {
    setLoading(true);
    Auth.login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        checkToken();
        setPopupOpen(true);
        setIsRegisterCompleted(true);
        history.push("/movies");
      })
      .catch((err) => {
        setPopupOpen(true);
        setIsRegisterCompleted(false);
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const checkToken = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      Auth.checkToken(jwt).then((res) => {
        setCurrentUser({ name: res.name, email: res.email, id: res._id });
        setLoggedIn(true);
        history.push(location);
      });
    }
  };

  function handleChangeProfile(curentUser) {
    console.log(curentUser);
    MainApi.editProfile(curentUser.name, curentUser.email)
      .then((res) => {
        setCurrentUser(res);
        setPopupOpen(true);
        setIsRegisterCompleted(true);
      })
      .catch((err) => {
        console.log(err);
        setPopupOpen(true);
        setIsRegisterCompleted(false);
      });
  }

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  function closePopup() {
     setPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        setFormValidProfile,
        setEmailProfile,
        setNameProfile,
        nameProfile,
        emailProfile,
        formValidProfile,
        currentUser,
        cards,
        handlerSearchForm,
        searchForm,
        searchFormDirty,
        setFormValid,
        formValid,
        handleSearchCard,
        setCards,
        setSearchInput,
        setSearchForm,
        handleCardLike,
        savedCards,
        getSavedCard,
        deleteCard,
        setSearchFormDirty,
        setSavedCards,
      }}
    >
      <Switch>
        <Route exact path="/">
          <Header loggedIn={isLoggedIn} />
          <Main />
          <Footer />
        </Route>

        <Route path="/signup">
          {isLoggedIn ? (
            <Redirect to="movies" />
          ) : (
            <Register onRegister={handleRegister} />
          )}
        </Route>

        <Route path="/signin">
          {isLoggedIn ? (
            <Redirect to="movies" />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <ProtectedRoute isLoggedIn={isLoggedIn} path="/movies">
          <Header loggedIn={isLoggedIn} />
          <Movies loading={loading} />
        </ProtectedRoute>

        <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
          <Header loggedIn={isLoggedIn} />
          <Profile
            onSubmit={handleChangeProfile}
            onLogout={handleLogout}
            currentUser={currentUser}
          />
        </ProtectedRoute>

        <ProtectedRoute isLoggedIn={isLoggedIn} path="/saved-movies">
          <Header loggedIn={isLoggedIn} />
          <SavedMovies />
        </ProtectedRoute>
      
   

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Popup
          isOpen={popupOpen}
          isRegisterCompleted={isRegisterCompleted}
          onClose={closePopup}
        />
       
    </CurrentUserContext.Provider>
  );
}
