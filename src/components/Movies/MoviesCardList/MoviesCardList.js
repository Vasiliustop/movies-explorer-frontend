import MoviesCard from './../MoviesCard/MoviesCard'


export default function MoviesCardList({ cards }) {


    return (
        <ul className="movies-list">
             {cards.map((card) => {
          return <MoviesCard key={card.id} card={card} />
        })}
        </ul>
    );
}
