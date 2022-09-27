import "./style.css";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faAngleRight,
  faAngleLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const Car = ({
  car,
  newCars,
  setOpenModal,
  setModalImages,
  modalImages,
  cart,
  setCart,
  i,
  favorites,
  setFavorites,
  cartHasUpdated,
}) => {
  const [buttonText, setButtonText] = useState("Add");
  const imageRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [inCart, isInCart] = useState(false);
  const { make, model, year, url, price, transmission, miles, used } = car;
  const [count,setCount]=useState(0)
  const [prev,setPrev]=useState(0)

  //Handle Cart Button

  useEffect(() => {
    setButtonText(cart.includes(car) ? "Added" : "Add");
  }, [newCars, cart, car]);

  function mouseEnterBehavior() {
    if (!cart.includes(car)) {
      setButtonText("Add to cart");
    } else {
      setButtonText("Remove from cart");
    }
    setHover(true);
  }

  function mouseLeaveBehavior() {
    if (!cart.includes(car)) {
      setButtonText("Add");
    } else {
      setButtonText("Added");
    }
    setHover(false);
  }

  function handleCart() {
    if (!cart.includes(car)) {
      isInCart(true);
      setCart([...cart, car]);
      setButtonText("Added");
    } else {
      isInCart(false);
      setCart(cart.filter((item) => item.id !== car.id));
      setButtonText("Removed");
    }
  }

  useEffect(()=>{
    if (cart.includes(car)) {
      isInCart(true);
    } else {
      isInCart(false);
    }
  },[cartHasUpdated, car, cart])

  //Handle Page Load Behavior

  const loadIndex = () => (car.id <= 10 ? car.id : car.id % 10);

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 200 * loadIndex());
  }, []);

  // Handle Opem Modal

  function handleModal() {
    imageRef.current.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });
    setOpenModal(true);
    setModalImages([
      url,
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/2017_Honda_Civic_SR_VTEC_1.0_Front.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/2017_Honda_Civic_SR_VTEC_1.0_Rear.jpg",
    ]);
  }
  // handle direction

  function handleNext() {
      setCount(count + 1)
      setPrev(count)    
  }

  function handlePrev() {
    setCount(count - 1)
    setPrev(count)
  }

  let direction = count > prev ? 'increasing' : 'decreasing';

  let variants = {
    enter: (direction) => ({ x: direction === 'increasing' ? 500 : -500 }),
    center:{ x: 0 },
    exit: (direction) => ({ x: direction === 'increasing' ? -500 : 500 })
  }

 // misc

 const carImages = [
  url,
  "https://upload.wikimedia.org/wikipedia/commons/6/6d/2017_Honda_Civic_SR_VTEC_1.0_Front.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/f6/2017_Honda_Civic_SR_VTEC_1.0_Rear.jpg",
];

  const unavailable =
    "https://media.istockphoto.com/vectors/no-camera-icon-vector-id1202407074?k=20&m=1202407074&s=170667a&w=0&h=vk73jggd8Aq5QdQOYdH35vXYE3fkj4plVRkQV4ibHSo=";

  const renderStyles = {
    opacity: hidden ? "0" : "1",
    transition: ".2s all",
  };

  //$30,000, 60-month loan at 4% would be $3,150. So, your monthly payment would be $552.50 ($30,000 + $3,150 ÷ 60 = $552.50). 

  const taxAndFees = Math.floor((price * 0.07) + 1000)
  const monthlyPayment = Math.floor(((price* 1.1) + taxAndFees) / 60)

  const addToFavorites = () => {
    if(favorites.includes(car)){
      let filteredFavorites = favorites.filter((favorite) => favorite.id !== car.id)
      setFavorites(filteredFavorites);
    }else{
      setFavorites([...favorites, car]);
    }
  }

  return (
    <div>
      {hidden ? (
        <div className="loading">
          <img
            className="spinner"
            src="https://media2.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif"
            alt=""
          />
        </div>
      ) : (
        <div
          style={renderStyles}
          className="car-card"
          onMouseEnter={() =>
            (imageRef.current.style.filter = "brightness(1.1) saturate(1.2)")
          }
          onMouseLeave={() => (imageRef.current.style.filter = "brightness(1)")}
        >
          <FontAwesomeIcon
            className="like-button"
            icon={faHeart}
            onClick={addToFavorites}
            style={{ color: favorites.includes(car) && 'rgb(255,90,90)'}}
          />
          <motion.button
            className="cart-button"
            style={{
              backgroundColor: cart.includes(car)
                ? "rgb(100,80,255)"
                : "rgb(255,90,90)",
            }}
            onMouseEnter={mouseEnterBehavior}
            onMouseLeave={mouseLeaveBehavior}
            animate={{ x: hover ? "-60px" : 0 }}
            transition={{
              type: "spring",
              duration: hover ? 0.1 : 0.4,
              bounce: hover ? 0.8 : 0.4,
            }}
            onClick={handleCart}
          >
            {!inCart ? (
              <FontAwesomeIcon icon={faPlus} />
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
            <p>{buttonText}</p>
          </motion.button>
          <p className="title">
            {make} {model}
          </p>
          {url?.length > 1 ? (
            <div 
            className='imageWrapper'
            ref={imageRef}
              style={{ overflow: "hidden", height: '250px', position:"relative", backgroundColor:'black' }}
              >
              <AnimatePresence mode="wait" custom={direction} initial={false}> 
                <motion.div
                  className="carImage"
                  key={count}
                  transition={{ duration: .3, type: 'spring' }}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  onClick={handleModal}
                  style={{ backgroundImage: `url(${carImages[Math.abs(count) % carImages.length]})` }}
                />
              </AnimatePresence>
            </div>
          ) : (
            <img src={unavailable} alt="" width="70%" height="250px" />
          )}
          <ul className="description">
            <li>Miles: {miles.toLocaleString("en-US")}</li>
            <li>
              ${price.toLocaleString("en-US")}
              <span> Est. ${monthlyPayment.toLocaleString("en-US")}/mo.</span>
            </li>
            <li>Year: {year}</li>
            <li>Transmission: {transmission}</li>
            <li>{used ? "pre-owned" : "new"}</li>
            <li>Verified</li>
          </ul>
          {url.length > 1 && (
            <div className="swipe-buttons">
              <button onClick={handlePrev}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  size="3x"
                  color="rgb(255,255,255,.3)"
                />
              </button>
              <button onClick={handleNext}>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size="3x"
                  color="rgb(255,255,255,.3)"
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Car;
