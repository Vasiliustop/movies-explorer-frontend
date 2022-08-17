import MoviesCard from './../MoviesCard/MoviesCard'


export default function MoviesCardList({  isSaved, movies }) {


    return (
        <ul className="movies-list">
             {movies.map((movie) => {
          return <MoviesCard key={movie.id} movie={movie} isSaved={isSaved} />
        })}
        </ul>
    );
}
