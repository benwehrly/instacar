import "./style.css";

const Offer = ({ setOfferOpen }) => {
  return (
    <div className="offer">
      <p>20% Off All Pre-Owned Camrys!</p>
      <div onClick={() => setOfferOpen(false)}>X</div>
    </div>
  );
};

export default Offer;
