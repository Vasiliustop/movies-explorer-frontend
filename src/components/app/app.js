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
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log(currentUser)
    console.log(`авторка ${isLoggedIn}`)
    checkToken();
  }, []);
  
  const handleRegister = (name, email, password) => {
    Auth.register(name, email, password)
      .then((res) => {
        handleLogin ()
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
          <Header loggedIn={false}/>
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
      <Header loggedIn={true}  />
        <Movies isLoggedIn={isLoggedIn} />
      </ProtectedRoute>

      <ProtectedRoute isLoggedIn={isLoggedIn}  path="/profile">
      <Header loggedIn={true}  />
        <Profile   onSubmit={handleChangeProfile}
                   onLogout={handleLogout}
                   currentUser={currentUser}
        
        />
      </ProtectedRoute>

      <ProtectedRoute isLoggedIn={isLoggedIn}  path="/saved-movies">
      <Header  loggedIn={true}  />
        <SavedMovies />
      </ProtectedRoute>

      
      <Route path='*'>
        <NotFound />
      </Route>
      </Switch>
      </CurrentUserContext.Provider>
  );
}
