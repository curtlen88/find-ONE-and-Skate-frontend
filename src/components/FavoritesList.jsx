import { useState, useEffect } from 'react'
import axios from 'axios'

export default function FavoritesList(props) {

    const [favorites, setFavorites] = useState([])
    
    // GET /favorites 
    useEffect(() => {
        const getFavorites = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/favorites`)
            setFavorites(response.data)
            // map over favorites and display them
            setFavorites(response.data.map(favorite => {
                return (
                    <div>
                        <h3>{favorite.name}</h3>
                        <p>{favorite.description}</p>
                        <img src={favorite.image} alt={favorite.name} />
                    </div>
                )
            }))
        }
    getFavorites()
    }, [])

    return (
        <div>
            {favorites}
        </div>
    )
}