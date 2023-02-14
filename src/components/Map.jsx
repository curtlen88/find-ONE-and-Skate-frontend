import React, { Link, useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../index.css";
import axios from "axios";


import GeocodeForm from "./GeocodeForm";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.2712);
  const [lat, setLat] = useState(37.8044);
  const [zoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // axios request to the spot mongodb to retrieve all the spots and add them to the map
    const getSpots = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/spots`);
      const spots = response.data;
      spots.forEach((spot) => {
        new mapboxgl.Marker()
          .setLngLat([spot.lng, spot.lat])
          .addTo(map.current)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`
            <h3>${spot.name}</h3>
            
          `)
          
          );
      });
    };
    getSpots();
    
    

    // add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // add fullscreen control to the map.
    map.current.addControl(new mapboxgl.FullscreenControl());

    // add scale control to the map.
    map.current.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: "imperial",
      })
    );



// add a layer of dots to the map on mouse clicks
    map.current.on("load", () => {
      map.current.addLayer({
        id: "points",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        layout: {
          "icon-image": "dot-11",
          "icon-size": 3,
        },
      });
      
      map.current.on("dblclick", (e) => {
        let features = map.current.getSource("points")._data.features;
        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [e.lngLat.lng, e.lngLat.lat],
          },
          properties: {},
        });

        map.current.getSource("points").setData({
          type: "FeatureCollection",
          features: features,
        });
      });
    });

    // add popup to marker
    map.current.on("click", "points", (e) => {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        // add a button in the popup to add a new spot
        .setHTML(`<form id="spotForm">
        <label htmlfor="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <label htmlfor="description">Description:</label>
        <textarea id="description" name="description"></textarea><br><br>
        <input type="submit" value="Submit">
        </form>`)
        .addTo(map.current);
    
      const spotForm = document.getElementById("spotForm");
      spotForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // axios request to the spot mongodb to add a new spot
        const addSpot = async () => {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/spots`, {
            lng: e.lngLat.lng,
            lat: e.lngLat.lat,
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
          });
          console.log(response);
        }
        addSpot();
      });
    });
    

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.current.on("mouseenter", "points", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.current.on("mouseleave", "points", () => {
      map.current.getCanvas().style.cursor = "";
    });
  });

  // update map position when state changes
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    // Fly to the new location when the lat and lng state values change
    map.current.flyTo({
      center: [lng, lat],
      zoom: zoom,
      speed: 1, // animation speed, in seconds
      curve: 1, // animation curve, controls the easing
    });
  }, [lat, lng, zoom]);

  return (
    <div>
        <GeocodeForm setLat={setLat} setLng={setLng} />
        {/* <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div> */}
        <div ref={mapContainer} className="map-container" />
    </div>
  );
}