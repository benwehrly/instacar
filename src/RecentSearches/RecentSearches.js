import "./style.css";
import FavoriteTab from '../FavoriteTab/FavoriteTab'

const RecentSearches = ({ recent, setRecent, setNewCars, cars, favorites }) => {
  function handleClick(term) {
    setNewCars(
      cars.filter((car) =>
        Object.values(car)
          .join("")
          .trim()
          .toUpperCase()
          .includes(term.trim().toUpperCase())
      )
    );
  }

  return (
    <div className="recent">
      <h4>Recent Searches</h4>
      {recent.length > 0 ? (
        recent
          .slice(-10)
          .reverse()
          .filter((term) => term.trim().length > 1)
          .map((search) => <p onClick={() => handleClick(search)}>{search}</p>)
      ) : (
        <h5>no search history</h5>
      )}
      <h4>Favorites</h4>
      {favorites.length > 0 ? 
      (favorites.map((favorite) => <FavoriteTab favorite={favorite} setNewCars={setNewCars} cars={cars}/>)
      ) : (
        <h5>none favorited</h5>
      )}
    </div>
  );
};

export default RecentSearches;
