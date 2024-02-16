import { useEffect, useState } from "react";
import {
  getAllGenres,
  gameData,
  addToSavedGames,
  deleteFromSavedGames,
} from "../services/gameServices.js";
import { useNavigate } from "react-router-dom";

export const GameSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGenres();
  }, []);

  const handleSearch = async (gameSearched) => {
    const gameArray = await gameData(gameSearched);
    // const filteredGames = gameArray.filter((game) =>
    //   game.title.toLowerCase().includes(searchText.toLowerCase())
    // );
    setSearchResults(gameArray);
    console.log(searchResults);
  };

  const getGenres = async () => {
    const genreData = await getAllGenres();
    setGenres(genreData);
  };

  const handleGenreChange = (event, index) => {
    const selectedGenre = event.target.value;
    const updatedSearchResults = [...searchResults];
    updatedSearchResults[index].genre = selectedGenre;
    setSearchResults(updatedSearchResults);
    addGameToUserList(updatedSearchResults[index], selectedGenre);
  };

  const addGameToUserList = (game, genre) => {
    setUserGames((prevGames) => [...prevGames], { ...game, genreId: genre.id });
  };

  useEffect(() => {
    const localLoggedUser = localStorage.getItem("gameList_user");
    const gameUserObject = JSON.parse(localLoggedUser);

    console.log(gameUserObject);
    setCurrentUser(gameUserObject);
  }, []);

  const handleAddToSavedGames = async (game) => {
    const dateNow = new Date();
    const savedGame = {
      userId: currentUser.id,
      genreId: parseInt(game.genre),
      gameId: game.gameID,
      title: game.external,
      salePrice: game.cheapest,
      saleId: game.cheapestDealID,
      savedDate: dateNow.toISOString(),
    };
    addToSavedGames(savedGame);
    console.log(game);
    alert(`Game has been added!`);
  };

  return (
    <div>
      <div>
        <h1>What do you feel like spending money on?</h1>
      </div>
      <div>
        <button onClick={() => navigate(`/userGamesList/${currentUser.id}`)}>
          Take me back
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search.."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button onClick={() => handleSearch(searchText)}>
          Look for a deal!
        </button>
      </div>
      <div>
        <ul>
          {searchResults.map((game, index) => (
            <li key={index}>
              {game.external} - Cheapest Price: ${game.cheapest}{" "}
              <img src={`${game.thumb}`} />
              <select onChange={(event) => handleGenreChange(event, index)}>
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.text}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAddToSavedGames(game)}>
                Add to List
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
//State to hold genres as a dropdown selector
//display top 5-6 similiar listing
//find a way to filter search results, sort as well ++++++
//build a call to filter/sort out search requests ++++++++++
//build a search button +++++++++
// add a record of usergame to **the user games list**, with a genre id added
//for buttons, the first selected add would serve as an added,
//the second state of the button would remove the game from the same page
