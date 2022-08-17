const baseUrl = "https://api.vasilius.diplom.nomoredomains.xyz";

// const baseUrl = 'https://api.getmovies.nomoredomains.xyz';     // api Nini

// const baseUrl =  "https://api.mishenkadiplom.nomoredomains.xyz"    // api Mishi

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((data) => {
      throw data;
    });
  }
}

function getToken() {
  return `Bearer ${localStorage.getItem('jwt')}`;
}

export function editProfile(name, email) {

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify({
      email,
      name
    }),
  }).then(checkResponse);
}




// export function getSavedMovies(token) {
//   return fetch(`${baseUrl}/movies`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// }
// export function saveMovie(token, card) {
//   return fetch(`${baseUrl}/movies`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       country: card.country,
//       director: card.director,
//       duration: card.duration,
//       year: card.year,
//       description: card.description,
//       image: card.image,
//       trailerLink: card.trailerLink,
//       nameRU: card.nameRU,
//       nameEN: card.nameEN,
//       thumbnail: card.thumbnail,
//       movieId: card.movieId,
//     }),
//   }).then(checkResponse);
// }

// export function deleteMovie(token, id) {
//   return fetch(`${baseUrl}/movies/${id}`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// }