import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import SearchForm from "../Movies/SearchForm/SearchForm"
import savedMovies from '../../utils/savedMovies';

export default function SavedMovies () {
    
    
    return(
        <section className="saved-movies">
            <SearchForm />
             <MoviesCardList 
             cards={savedMovies}
             />
        </section>
    )
}