import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../index.css";

import GeocodeForm from "./GeocodeForm";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.2712);
  const [lat, setLat] = useState(37.8044);
  const [zoom, setZoom] = useState(10);
  const [hover, setHover] = useState(false);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    });

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

    // // add a layer to the map
    // map.current.on("load", () => {
    //   map.current.addLayer({
    //     id: "points",
    //     type: "circle",
    //     source: {
    //       type: "geojson",
    //       data: {
    //         type: "FeatureCollection",
    //         features: [
    //           {
    //             type: "Feature",
    //             geometry: {
    //               type: "Point",
    //               coordinates: [-122.2712, 37.8044],
    //             },
    //             properties: {
    //               title: "Mapbox",
    //               description: "San Francisco, California",
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     paint: {
    //       "circle-radius": 10,
    //       "circle-color": "#007cbf",
    //     },
    //   });
    // });

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
        .setHTML(e.features[0].properties.description)
        .addTo(map.current);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.current.on("mouseenter", "points", () => {
      setHover(true);
      map.current.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.current.on("mouseleave", "points", () => {
      setHover(false);
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


  // add points to the map on click
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   // add a layer to the map

  //   map.current.on('click', (e) => { // add marker on click event
  //     // if (marker.current) marker.current.remove(); // remove existing marker if present

  //     marker.current = new mapboxgl.Marker() // add marker
  //       .setLngLat(e.lngLat) // set marker position
  //       .addTo(map.current) // add marker to map

  //     // add popup to marker
  //     popup.current = new mapboxgl.Popup({ closeOnClick: false })
  //       .setLngLat(e.lngLat)
  //       // add a button to the popup that will add the marker to the database
  //       .setHTML('<button onClick="addtoDB()">Add to Favorites</button>')
  //       .addTo(map.current);
  //   });
  // });

  return (
    <div>
        <GeocodeForm setLat={setLat} setLng={setLng} />
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
    </div>
  );
}