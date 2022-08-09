import React from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile"
import NotFound from "../NotFound/NotFound";
import { Route, Switch } from "react-router-dom";


export default function app() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false}/>
          <Main />
          <Footer />
        </Route>
      
      <Route path="/signup">
        <Register />
      </Route>

      <Route path="/signin">
        <Login />
      </Route>
      
      <Route path="/profile">
      <Header loggedIn={true} />
        <Profile />
      </Route>

      <Route path="/movies">
      <Header loggedIn={true} />
        <Movies />
      </Route>

      <Route path="/saved-movies">
      <Header loggedIn={true} />
        <SavedMovies />
      </Route>

      <Route path='*'>
        <NotFound />
      </Route>
      </Switch>
    </>
  );
}
