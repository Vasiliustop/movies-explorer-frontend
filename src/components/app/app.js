import React from "react";
import { useState, useEffect } from "react";
import {Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile"
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import * as Auth from "../../utils/Auth"
import * as MainApi from "../../utils/MainApi"

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log(currentUser)
    console.log(`авторка ${isLoggedIn}`)
    checkToken();
  }, []);
  
  
  
  
  
  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.getItem('savedMovies')) {
        setSavedMovies((JSON.parse(localStorage.getItem('savedMovies'))));
      } else {
        getSavedMovies();
      }
    }
  }, [isLoggedIn])
  
  
  function getSavedMovies() {
   
    MainApi.getSavedMovies()
      .then(data => {
        updateSavedMovies(data);
      })
      .catch(err => {
        console.log("JJJKKKGET")
      })
  }

  function updateSavedMovies(savedMovies) {
    setSavedMovies(savedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }

  function onMovieSave(movie) {
    const isSaved = savedMovies?.some(i => i.movieId === movie.id);
   
    if (!isSaved) {
      MainApi
        .saveMovie(movie)
        .then((newMovie) => {
          updateSavedMovies([newMovie, ...savedMovies])
        
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      const id = savedMovies.find(item => item.movieId === movie.id)._id;
      MainApi
        .deleteMovie(id)
        .then(() => {
          updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie));
       
        })
        .catch((err) => {
         console.log(err)
        })
    }
  }

  function onMovieDel(movie) {
   
    const id = movie._id;
    MainApi
      .deleteMovie(id)
      .then(() => {
        updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie));
     
      })
      .catch((err) => {
       console.log(err)
      })
  }







  const handleRegister = (name, email, password) => {
    Auth.register(name, email, password)
      .then((res) => {
        handleLogin (email, password)
     })
      .catch((err) => {
        console.log("err", err);
      });
  };


 const handleLogin = (email, password) => {
    Auth
      .login(email, password)
      .then((res) => {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true)
          checkToken()
          history.push("/movies");
      })
      .catch((err) => {
         console.log("err", err);
      });
  };
  
   const checkToken = () => {
      if(localStorage.getItem("jwt")){
      const jwt = localStorage.getItem("jwt");
      Auth.checkToken(jwt).then((res) => {
      setCurrentUser({name: res.name, email: res.email, id: res._id})
      setLoggedIn(true)
      history.push(location);
      });
    }
  };
  
  function handleChangeProfile(curentUser) {
    console.log(curentUser)
    MainApi.editProfile(curentUser.name, curentUser.email)
    .then((res) => {
        setCurrentUser(res);
    }).catch(err => {
        console.log(err);
    })
}

const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

 return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Header loggedIn={isLoggedIn}/>
          <Main />
          <Footer />
        </Route>
      
      <Route path="/signup">       
      {isLoggedIn ? (<Redirect to="movies" /> ) :  (
         <Register onRegister={handleRegister} />
         )}               
      </Route>

      <Route path="/signin">      
        {isLoggedIn ? (<Redirect to="movies" /> ) : ( 
        <Login onLogin={handleLogin}/>
         )}  
       
        </Route>
      

      <ProtectedRoute isLoggedIn={isLoggedIn}  path="/movies">
      <Header loggedIn={isLoggedIn}  />
        <Movies loggedIn={isLoggedIn} 
             onMovieSave={onMovieSave}
             savedMovies={savedMovies}
        
         />
      </ProtectedRoute>

      <ProtectedRoute isLoggedIn={isLoggedIn}  path="/profile">
      <Header loggedIn={isLoggedIn}  />
        <Profile   onSubmit={handleChangeProfile}
                   onLogout={handleLogout}
                   currentUser={currentUser}
        
        />
      </ProtectedRoute>

      <ProtectedRoute isLoggedIn={isLoggedIn}  path="/saved-movies">
      <Header  loggedIn={isLoggedIn}  />
        <SavedMovies 
          component={SavedMovies}
          movies={savedMovies}
          getMovies={getSavedMovies}
          onMovieDel={onMovieDel}
        
        />
      </ProtectedRoute>

      
      <Route path='*'>
        <NotFound />
      </Route>
      </Switch>
      </CurrentUserContext.Provider>
  );
}
