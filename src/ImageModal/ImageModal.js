import "./style.css";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

const ImageModal = ({ modalImages, setOpenModal }) => {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const photoRef = useRef(null);


  // Handle Swipe Through Images ***REDUNDANT***

  function nextImage() {
    if (index < modalImages.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
    }
  }

  function prevImage() {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(modalImages.length - 1);
    }
  }

  //Handle Zoom ( replace transform with zoom-in/out )

  function handleZoom(e) {
    e.preventDefault();
    setCount((prev) => prev + 1);
    if (count % 2 === 0) {
      photoRef.current.style.transform = "scale(.9)";
      photoRef.current.style.cursor = "zoom-out";
    } else {
      photoRef.current.style.transform = "scale(.6)";
      photoRef.current.style.cursor = "zoom-in";
    }
  }

  return (
    <div className="backdrop">
      <div>
        <button className="change-image" onClick={nextImage}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <img
          src={modalImages[index]}
          alt=""
          width="70%"
          height="50%"
          ref={photoRef}
          onClick={handleZoom}
        />

        <button className="change-image" onClick={prevImage}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button className="close-modal" onClick={() => setOpenModal(false)}>
          <FontAwesomeIcon icon={faXmark}/>
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
