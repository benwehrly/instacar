import "./style.css";

const ShowMoreButton = ({ setMaxItems, maxItems }) => {
  const handleClick = () => {
    setMaxItems(maxItems + 10);
  };

  return (
    <button className="showMore" onClick={handleClick}>
      Show More
    </button>
  );
};

export default ShowMoreButton;
