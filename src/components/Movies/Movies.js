import React from "react";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "./../Footer/Footer";
import Preloader from "./Preloader/Preloader";
import cards from "../../utils/movies.js";

export default function Movies() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(!isLoading), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="movies">
      <SearchForm />
      {!isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList cards={cards} isSaved={false} />
      )}

      <button className="movies__next-button">Ещё</button>
      <Footer />
    </section>
  );
}
