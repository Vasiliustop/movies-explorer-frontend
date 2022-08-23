const baseUrl = "https://api.vasilius.diplom.nomoredomains.xyz";


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


export const saveMovie = (card) => {
  return fetch(`${baseUrl}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: `https://api.nomoreparties.co${card.image.url}`,
          trailerLink: card.trailerLink,
          thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
          movieId: card.id,
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