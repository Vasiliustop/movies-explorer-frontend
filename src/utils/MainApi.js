const baseUrl = "https://api.vasilius.diplom.nomoredomains.xyz";
const MOVIES_URL = "https://api.nomoreparties.co";

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

export function getSavedMovies() {
  return fetch(`${baseUrl}/movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }).then(checkResponse);
}


export const saveMovie = (movie) => {
  return fetch(`${baseUrl}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `${MOVIES_URL}${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          movieId: movie.id,
      }),
    }).then(checkResponse);
};

export function deleteMovie(id) {
  return fetch(`${baseUrl}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }).then(checkResponse);
}