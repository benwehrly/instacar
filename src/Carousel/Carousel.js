import "./style.css";
import { motion } from "framer-motion";
import { useRef } from 'react' 

const Carousel = ({ cars }) => {

  const wrapperRef = useRef(null)

  return (
    <div className="carousel-container" ref={wrapperRef}>
      <h1>New Arrivals</h1>
      <motion.div
      className="carousel"
      drag="x"
      dragConstraints={wrapperRef}
      dragElastic={0.2}
      >
        {cars.map(({model, make, url}) => <div 
          className='carousel-item'
          style={{ backgroundImage: `url(${url})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center' }}
        >
          <p className='carouselItemName'>{make + ' ' + model}</p>
  
        </div>)}
      </motion.div>
    </div>
  );
};

export default Carousel;
