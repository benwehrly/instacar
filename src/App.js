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
import Cart from "./Cart/Cart.js"
import data from './data'

export default function App() {

  const [cars, setCars] = useState(data);
  const [newCars, setNewCars] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [offerOpen, setOfferOpen] = useState(true);
  const [recent, setRecent] = useState([]);
  const [cart, setCart] = useState([]);
  const [maxItems, setMaxItems] = useState(10);
  const [favorites, setFavorites] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('New Arrivals')
  const [ cartIsOpen, setCartIsOpen ] = useState(false);
  const [ cartHasUpdated, setCartHasUpdated ] = useState(false);

  const isHomepage = newCars === cars

  const heroCategrories = ['New Arrivals', 'Great Deals', 'Staff Picks']


  const heroStyles = (category) => {
    let isSelected = category === selectedCategory
    if(isSelected){
      return {backgroundColor: '#3e3e3e', color: 'white', outline: "2px solid #3e3e3e"}
    }
  }

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
        cartIsOpen={cartIsOpen}
        setCartIsOpen={setCartIsOpen}
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

      {isHomepage && <div className='hero'>
      <div className='hero-categories'>
        {heroCategrories.map(category => <h1 
          className='hero-title'
          onClick={() => setSelectedCategory(category)}
          style={heroStyles(category)}
        >{category}</h1>)}
      </div>
       <Carousel 
        cars={cars}
        selectedCategory={selectedCategory}
        setNewCars={setNewCars}
        />
      </div>}

      <div 
        className="garage"
        style={{ marginTop: !isHomepage && '120px'}}  
      >

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
            cartHasUpdated={cartHasUpdated}
            setCartHasUpdated={setCartHasUpdated}
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
      <Cart 
        cart={cart} 
        setCart={setCart}
        cartIsOpen={cartIsOpen}
        setCartIsOpen={setCartIsOpen}
        cartHasUpdated={cartHasUpdated}
        setCartHasUpdated={setCartHasUpdated}
        />
      <Chat />
      {newCars.length > 0 && <ShowMoreButton maxItems={maxItems} setMaxItems={setMaxItems} />}
      <Footer />
    </div>
  );
}
