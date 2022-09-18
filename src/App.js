import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header/Header.js";
import Offer from "./Offer/Offer.js";
import Car from "./Car/Car.js";
import ImageModal from "./ImageModal/ImageModal.js";
import RecentSearches from "./RecentSearches/RecentSearches";
import Chat from "./Chat/Chat.js";
import Footer from "./Footer/Footer.js";
import Carousel from "./Carousel/Carousel.js";
import ShowMoreButton from "./ShowMoreButton/ShowMoreButton.js";
import data from './data'

export default function App() {

  const [cars, setCars] = useState(data);

  // const tags = useState([cars.map((car) => Object.values(car))]);

  const [newCars, setNewCars] = useState(data);
  // const [sortedCars, setSortedCars] = useState([...newCars]);
  const [openModal, setOpenModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [offerOpen, setOfferOpen] = useState(true);
  const [recent, setRecent] = useState([]);
  const [cart, setCart] = useState([]);
  const [maxItems, setMaxItems] = useState(10);
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    console.log(modalImages);
  }, [modalImages]);

  return (
    <div className="App">
      {offerOpen && <Offer setOfferOpen={setOfferOpen} />}
      <Header
        offerOpen={offerOpen}
        setNewCars={setNewCars}
        newCars={newCars}
        cars={cars}
        setRecent={setRecent}
        recent={recent}
        setCars={setCars}
        cart={cart}
        setMaxItems={setMaxItems}
      />
      <div className="recent-container" style={{ top: cars !== newCars && '20px'}}>
        <RecentSearches
          setRecent={setRecent}
          recent={recent}
          setNewCars={setNewCars}
          cars={cars}
          favorites={favorites}
          setFavorties={setFavorites}
        />
      </div>

      <div className="garage">
        {newCars === cars && <Carousel cars={cars}/>} {/* Remove from garage? */}
        {newCars.slice(0, maxItems).map((car, i) => (
          <Car
            key={car.id}
            car={car}
            i={i}
            setOpenModal={setOpenModal}
            setModalImages={setModalImages}
            modalImages={modalImages}
            cart={cart}
            setCart={setCart}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
      {openModal && (
        <ImageModal modalImages={modalImages} setOpenModal={setOpenModal} />
      )}
      {newCars.length === 0 && (
        <h1 className='noResults'>
          No results &#9785;
          <button
            onClick={() => setNewCars([...cars])}
          >
            Return Home
          </button>
        </h1>
      )}
      <Chat />
      <ShowMoreButton setMaxItems={setMaxItems} />
      <Footer />
    </div>
  );
}
