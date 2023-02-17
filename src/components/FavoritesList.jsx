import { clearStorage } from 'mapbox-gl'
import { useState, useEffect } from 'react'
// import axios from 'axios'
// import User from '../models/User'
// import Spot from '../../../foas-backend/models/Spot'


export default function FavoritesList(props) {

    // const [favorites, setFavorites] = useState([])
    // const token = localStorage.getItem('jwt')
    
    // GET /favorites 
    useEffect(() => {
        // const getFavorites = async () => {
        //     const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/favorites`, {headers: {Authorization: token} })
        //     console.log(response.data.favSpots)
        //     setFavorites(response.data.favSpots)
        //     // map over favorites and display them
        // }
        // getFavorites()
        // console.log("props.currentUser -----", props.currentUser)
        // const usersSpots = props.currentUser.populate('favSpots')

        // console.log(usersSpots)
    }, [])
    

    // const listFavorites = favorites.map(favorite => {
    //     return (
    //         <div>
    //             <h3>{favorite.name}</h3>
    //             <p>{favorite.description}</p>
    //             <img src={favorite.image[0]} alt={favorite.name} />
    //         </div>
    //     )
    // })

    return (
        <div>
            {/* {listFavorites} */}
        </div>
    )
}