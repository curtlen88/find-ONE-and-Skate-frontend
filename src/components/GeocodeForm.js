import React, { useState } from 'react';
import axios from 'axios';


const GeocodeForm = () => {
    const [city, setCity] = useState('');
    const [coordinates, setCoordinates] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`, {
            params: {
                access_token: process.env.REACT_APP_MAPBOX_TOKEN,
            },
            });

            const [firstMatch] = response.data.features;
            const { center, place_name } = firstMatch;
            console.log(response.data.features)
            setCoordinates(center);
            alert(`Coordinates for ${place_name}: [${center[0]}, ${center[1]}]`);
        } catch (error) {
            console.error(error);
            alert('There was an error fetching the coordinates. Please try again.');
        }
        };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="city-input">
                City
            <input
                type="text"
                id="city-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            </label>
            <button type="submit">Get Coordinates</button>
        </form>
    );
};

export default GeocodeForm;
