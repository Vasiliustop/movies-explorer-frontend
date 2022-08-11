import MoviesCard from './../MoviesCard/MoviesCard'


export default function MoviesCardList({ cards, isSaved }) {


    return (
        <ul className="movies-list">
             {cards.map((card) => {
          return <MoviesCard key={card.id} card={card} isSaved={isSaved} />
        })}
        </ul>
    );
}
