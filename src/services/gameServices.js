export const getAllGenres = () => {
  return fetch("http://localhost:8088/genres").then((res) => res.json());
};

export const gameData = (keyword) => {
  return fetch(
    `https://www.cheapshark.com/api/1.0/games?title=${keyword}&limit=10`
  ).then((res) => res.json());
};

export const getUserGamesById = (userId) => {
  return fetch(
    `http://localhost:8088/userSavedGames?userId=${userId}&_expand=genre`
  ).then((res) => res.json());
};

export const getUsersGameList = () => {
  return fetch("http://localhost:8088/userSavedGames?_expand=genre").then(
    (res) => res.json()
  );
};

export const addToSavedGames = (savedGame) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(savedGame),
  };

  return fetch("http://localhost:8088/userSavedGames", postOptions);
};

export const deleteFromSavedGames = (id) => {
  console.log(id);
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`http://localhost:8088/userSavedGames/${id}`, deleteOptions);
};

export const getGameDetailsByGameId = (gameId) => {
  return fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameId}`).then(
    (res) => res.json()
  );
};

// placeholder for the actual put funciton
export const updateUserGameDeal = (userGame) => {
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userGame),
  };
  const response = fetch(
    `http://localhost:8088/userSavedGames/${userGame.id}`,
    putOptions
  ).then((res) => res.json());

  return response;
};
