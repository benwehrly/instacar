import "./style.css";
import { motion, AnimatePresence, transform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Carousel = ({ cars, selectedCategory, setNewCars }) => {
  const wrapperRef = useRef(null);

  const [ featuredCars, setFeaturedCars] = useState(cars);

  useEffect(()=>{
    console.log(wrapperRef)
  },[selectedCategory])

  return (
    <div className="carousel-container" ref={wrapperRef}>
      <AnimatePresence>
        <motion.div
          className="carousel"
          drag="x"
          dragConstraints={wrapperRef}
          dragElastic={0.01}
          animate={{ x: -3360}}
          transition={{ duration: 120, type: 'tween', ease: 'linear'}}
          key={selectedCategory}
        >
          {featuredCars.map(car => <CarouselItem car={car} setNewCars={setNewCars} />)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Carousel;

const CarouselItem = ({ car, setNewCars }) => {

  const { model, make, url } = car

  const contentRef = useRef(null);
  const [ isHovered, setIsHovered ] = useState(false)

  const hoveredStyles = {
    height: '170px',
    transform: 'scale(1.1)',
    top: 0
  }

  const unavailable =
  "https://media.istockphoto.com/vectors/no-camera-icon-vector-id1202407074?k=20&m=1202407074&s=170667a&w=0&h=vk73jggd8Aq5QdQOYdH35vXYE3fkj4plVRkQV4ibHSo=";

  return(
    <div
    className="carousel-item"
    style={{
      backgroundImage: url? `url(${url})` : `url(${unavailable})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    {/* <img 
      src={url ? url : unavailable} 
      alt=''
      style={{ width: '400px', height: '150%', marginTop: '-40px', zIndex: 0}}
      className='carouselImage'
      /> */}
    <div 
      className="carouselItemContent"
      ref={contentRef}
      style={isHovered ? hoveredStyles : null}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <p>{make + " " + model}</p>
      <button onClick={() => setNewCars([car])}>View Vehicle</button>
    </div>
  </div>
  )
}
