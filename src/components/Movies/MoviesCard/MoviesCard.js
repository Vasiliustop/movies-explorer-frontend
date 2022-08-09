import React, { useState } from "react";


export default  function MoviesCard({ card }) {
    
    const [favorite, setFavorite] = useState(false);

    function handleFavoriteToogle() {
        setFavorite(!favorite);
    }

    return (
        <li className="card-movies">
             <div className="card-movies__description">
                <div className="card-movies__rows">
                    <p className="card-movies__name">{card.title}</p>
                    <button
                     className={`card__like card__like${favorite ? '_inactive' : '_active'}`} onClick={handleFavoriteToogle}
                        type="button" 
                    ></button>
                </div>
                <p className="card-movies__length">1ч 47м</p>
            </div>
            <img className="card-movies__image"
                src={card.image} alt={card.title}
                 />
           
        </li>
    );
}

