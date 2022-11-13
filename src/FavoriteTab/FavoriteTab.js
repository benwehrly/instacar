import './style.css'

const FavoriteTab = ({ favorite, setNewCars, cars }) => {

    function handleClick(){
        let result = cars.filter(car => car === favorite)
        setNewCars(result)
    }

    const { make, model, year, url } = favorite

    return (
        <div 
            className='favorite-tab'
            onClick={handleClick}
        >
            <img className='favorite-img' src={url} alt=''/>
            <p>{`${year} ${make} ${model}`}</p>
        </div>
    )
}

export default FavoriteTab