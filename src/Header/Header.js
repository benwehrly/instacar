import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import trendingIcon from "./trending.png";

const Header = ({
  offerOpen,
  setCars,
  newCars,
  setNewCars,
  cars,
  setRecent,
  recent,
  cart,
  setMaxItems,
  cartIsOpen,
  setCartIsOpen
}) => {

  const [focused, setFocused] = useState(false);
  const popular = ["camry", "honda", "electric"];
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    // if (e.key === "ArrowDown"){} <= set focus to recent searches
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    console.log("cars:" + newCars);
    console.log("search term: " + searchTerm);
  }, [newCars, searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();
    setNewCars(
      cars.filter((car) =>
        Object.values(car)
          .join("")
          .trim()
          .toUpperCase()
          .includes(searchTerm.trim().toUpperCase())
      )
    );
    setRecent([...recent, searchTerm]);
  }

  return (
    <div>
      <header
        style={{ marginTop: offerOpen ? "20px" : 0, transition: ".5s all" }}
      >
        <h2
          onClick={() => {
            setNewCars(cars.sort((a, b) => a.id - b.id));
            setMaxItems(10);
          }}
        >
          Instacar
          <img
            src="http://cdn.onlinewebfonts.com/svg/img_127531.png"
            alt=""
            width="40px"
            onClick={() => setNewCars([...cars])}
          />
        </h2>
        <div className="searchbar-popular">
          <div className="searchbar">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Search Vehicles..."
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 300)}
                onChange={handleSearch}
                value={searchTerm}
                onClick={()=> setSearchTerm('')}
              />
            </form>
            <FontAwesomeIcon
              className="search-icon"
              icon={faSearch}
              onClick={handleSubmit}
            />
          </div>
          {focused && (
            <div className="popular">
              <h4 className="popular-title">Popular Searches</h4>
              <Popular
                popular={popular}
                setNewCars={setNewCars}
                cars={cars}
                recent={recent}
                setRecent={setRecent}
                setSearchTerm={setSearchTerm}
              />
              <div className="media-recent">
                <h4 className="popular-title">Recent Searches</h4>
                {recent.map((item) => (
                  <p style={{ margin: 0 }}>{item}</p>
                ))}
              </div>
            </div>
          )}
        </div>
        <motion.div
          className="shopping-cart"
          style={{ backgroundColor: !cart.length && "gray" }}
          animate={{ scale: !cart.length ? 1.2 : [1.2, 1.5, 1.2] }}
          initial={{ scale: 1.2 }}
          transition={{ duration: 0.3, repeat: 1, delay: .1 }}
          key={cart}
          onClick={() => setCartIsOpen(!cartIsOpen)}
        >
          <FontAwesomeIcon
            className="cart-icon"
            icon={faCartShopping}
            color="white"
          />
          <p
            style={{ display: !cart.length && "none" }}
            className="cart-length"
          >
            {cart.length > 0 && cart.length}
          </p>
        </motion.div>
        <SortBox
          newCars={newCars}
          cars={cars}
          setNewCars={setNewCars}
          setCars={setCars}
        />
      </header>
    </div>
  );
};

export default Header;

const Popular = ({ popular, setNewCars, cars, recent, setRecent, setSearchTerm }) => {
  const addItemToRecent = (item) =>
    !recent.includes(item) && setRecent([...recent, item]);

  // send to app for reuse
  function handlePopular(term) {
    setNewCars(
      cars.filter((car) =>
        Object.values(car)
          .join("")
          .trim()
          .toUpperCase()
          .includes(term.trim().toUpperCase())
      )
    );
    setSearchTerm(term)
    addItemToRecent(term);
  }

  return (
    <div className="results">
      {popular.map((car) => (
        <p onClick={() => handlePopular(car)}>
          {car}
          <img
            // src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-trending-up_90400.png"
            src={trendingIcon}
            alt=""
            width="15px"
          />
        </p>
      ))}
    </div>
  );
};

const SortBox = ({ setNewCars, newCars, cars }) => {
  const [value, setValue] = useState(0);

  const [sortedCars, setSortedCars] = useState([...newCars]);

  function handleSort(e) {
    setValue(parseInt(e.target.value));
    setNewCars([...newCars]); //<--sorted cars?
    // setSortedCars([...newCars])
  }

  useEffect(() => {
    switch (value) {
      case 0:
        setNewCars(cars.sort((a, b) => a.id - b.id));
        break;
      case 1:
        setNewCars(cars.sort((a, b) => b.price - a.price));
        break;
      case 2:
        setNewCars(cars.sort((a, b) => a.price - b.price));
        break;
      case 3:
        setNewCars(cars.sort((a, b) => b.miles - a.miles));
        break;
      case 4:
        setNewCars(cars.sort((a, b) => a.miles - b.miles));
        break;
      case 5:
        setNewCars(cars.sort((a, b) => b.year - a.year));
        break;
      case 6:
        setNewCars(cars.sort((a, b) => a.year - b.year));
        break;
    }
    console.log(`sorted Cars: ${newCars}`);
  }, [value]);

  return (
    <div className="SortBox">
      <p>
        Sort By
        <select onChange={handleSort}>
          <option value={0}>No Sort</option>
          <option value={1}>Price: High to Low</option>
          <option value={2}>Price: Low to High</option>
          <option value={3}>Miles: High to Low</option>
          <option value={4}>Miles: Low to High</option>
          <option value={5}>Year: New to Old</option>
          <option value={6}>Year: Oldest to Newest</option>
        </select>
      </p>
      {/* <div>
        <p>Ascending</p>
        <p>Descending</p>
      </div> */}
    </div>
  );
};
