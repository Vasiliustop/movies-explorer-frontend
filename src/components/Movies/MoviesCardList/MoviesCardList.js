import MoviesCard from "./../MoviesCard/MoviesCard";
import Preloader from '../../Preloader/Preloader'



export default function MoviesCardList({
  cards, handleCardLike, savedCards, getSavedCard, loading,
}) {


  return (
    
    <ul className="movies-list">
      <Preloader loading={loading} />
  {cards.map((card) => (
        <MoviesCard getSavedCard={getSavedCard} savedCards={savedCards} handleCardLike={handleCardLike} card={card} key={card.id || card.movieId} />
      ))}
    </ul>
  );
}
