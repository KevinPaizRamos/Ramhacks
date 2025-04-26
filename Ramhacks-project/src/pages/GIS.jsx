import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Component to dynamically update the map's center
function UpdateMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function GIS() {
  const [userLocation, setUserLocation] = useState([37.7749, -122.4194]); // Default to San Francisco
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);

  const GOOGLE_API_KEY = 'AIzaSyBjS9X1ucWEFFeZsx3IKuCwWNhVjmpn_2U'; // Replace with your actual Google API key

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          fetchNearbyPlaces(latitude, longitude); // Fetch nearby places
        },
        (err) => {
          setError('Unable to retrieve your location');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  // Fetch nearby places using Google Places API
  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${latitude},${longitude}`,
            radius: 5000, // Search within 5km
            type: 'health', // Search for health-related places
            keyword: 'mental health', // Specific keyword for mental wellness
            key: GOOGLE_API_KEY,
          },
        }
      );

      const fetchedPlaces = response.data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
        position: [place.geometry.location.lat, place.geometry.location.lng],
      }));

      setPlaces(fetchedPlaces);
    } catch (err) {
      console.error('Error fetching places:', err);
      setError('Failed to fetch nearby places');
    }
  };

  return (
    <div className="gis-container">
      <h1>GIS Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer
        center={userLocation}
        zoom={12}
        style={{ height: '500px', width: '100%' }}
      >
        {/* Dynamically update the map's center */}
        <UpdateMapCenter center={userLocation} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* User's location marker */}
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
        {/* Nearby places markers */}
        {places.map((place) => (
          <Marker key={place.id} position={place.position}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default GIS;