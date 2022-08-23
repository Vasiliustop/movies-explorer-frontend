const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((data) => {
      throw data;
    });
  }
}

export function getInitialMovies() {
  return fetch(`${baseUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}






