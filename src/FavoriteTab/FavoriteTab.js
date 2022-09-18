import './style.css'

const FavoriteTab = ({ favorite }) => {
    return (
        <div className='favorite-tab'>
            <img className='favorite-img' src={favorite.url} alt='' width='40px'/>
            <p>{`${favorite.make} ${favorite.model}`}</p>
        </div>
    )
}

export default FavoriteTab