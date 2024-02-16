import { useEffect, useState } from "react";
import {
  deleteFromSavedGames,
  gameData,
  //   gameDealUpdate,
  getAllGenres,
  getGameDetailsByGameId,
  getUserGamesById,
  updateUserGameDeal,
} from "../services/gameServices.js";
import { useNavigate, useParams } from "react-router-dom";

export const UserGames = () => {
  const [userGames, setUserGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    getAllGenres().then((data) => setGenres(data.Genres));
  }, []);

  useEffect(() => {
    if (userId) {
      getUserGamesById(userId).then((games) => setUserGames(games));
    }
  }, []);

  const handleGameDelete = (gameId) => {
    deleteFromSavedGames(gameId).then((res) => {
      //update the usergames component
      getUserGamesById(userId).then((games) => setUserGames(games));
    });
  };

  const upDateLowestPrice = (game) => {
    // take inout as the game id
    // run that fetch to retrieve game details by game id
    getGameDetailsByGameId(game.gameId)
      .then((data) => {
        // get the cheapest deal
        const bestDeal = data.deals[0];
        // sned chepest deal, newdealid to local database
        const newGameCopy = structuredClone(game);
        //newgamecopy price replace wwith .price from bestdeal
        newGameCopy.salePrice = bestDeal.price;
        newGameCopy.saleId = bestDeal.dealID;

        delete newGameCopy.genre;

        return updateUserGameDeal(newGameCopy);
      })
      .then((res) => {
        //update the usergames component
        getUserGamesById(userId).then((games) => setUserGames(games));
      });
  };

  const logoutButton = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!userGames) {
    return <></>;
  }

  return (
    <div>
      <h1>Your Added Games you could buy</h1>
      <button onClick={() => navigate("/search")}>Search for games</button>
      <div>
        <button onClick={() => logoutButton()}>
          I don't want to be logged in anymore...
        </button>
      </div>
      <ul>
        {userGames.map((game) => (
          <li key={game.id}>
            {game.title} - Sales price: {game.salePrice} Your Genre Selected:
            {game.genre.text}
            <button onClick={() => handleGameDelete(game.id)}>
              Remove Game
            </button>
            <button onClick={() => upDateLowestPrice(game)}>
              Check Lowest Price
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

//Individual users
//Individual user lists
//ability to delete from specific lists
//see the current prices with an update function
//link to the search page for games
