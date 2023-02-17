import { useState, useEffect } from 'react'
import axios from 'axios'
import decode from 'jwt-decode'

export default function FavoritesList(props) {

    const [favorites, setFavorites] = useState([])
    const userId = decode(localStorage.getItem('jwtToken')).id
    
    useEffect(()  => {
        const fetchFavorites = async () => {
        try {
        // get the userFavorites from the backend
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`)
        // set the favorites state to the userFavorites
        console.log(response.data.favSpots[0].images[0])
        console.log(response.data.favSpots)

        setFavorites(response.data.favSpots)
        } catch (error) {
            console.log(error)
        }
        }
        fetchFavorites()
    }, [])


    if (favorites.length > 0) {
    const listFavorites = favorites.map(favorite => {
        return (
            <div className='card=container'>
                <div className='card' key={favorite._id}>
                    <img className='favImg' src={favorite.images[0]} alt={favorite.name}/>
                    < div className='card-text'>
                        <h2>{favorite.name}</h2>
                        <p>{favorite.description}</p>
                    </div>
                </div>
            </div>
        )
    })
        return (
            <div>
                <div id="favHeader">
                    <h1>My Favorites</h1>
                    <div class="skateboard-shape">
                    </div>
                </div>
                {listFavorites}
            </div>
        )
    } else {
        return (
            <div className='card-text'>
                <h2>You have no favorites</h2>
            </div>
        )
    }

}