import "./style.css";

const ShowMoreButton = ({ setMaxItems }) => {
  const handleClick = () => {
    setMaxItems((prev) => prev + 10);
  };

  return (
    <button className="showMore" onClick={handleClick}>
      Show More
    </button>
  );
};

export default ShowMoreButton;
