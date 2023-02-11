import React, { useRef, useEffect, useState } from 'react';
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import GeocodeForm from './components/GeocodeForm';
import './index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(-122.2712);
  const [lat, setLat] = useState(37.8044);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('click', (e) => { // add marker on click event
      // if (marker.current) { // remove marker if already exists
      //   marker.current.remove(); // remove marker
      // }
      marker.current = new mapboxgl.Marker() // add marker
        .setLngLat(e.lngLat) // set marker position
        .addTo(map.current); // add marker to map
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <GeocodeForm />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}