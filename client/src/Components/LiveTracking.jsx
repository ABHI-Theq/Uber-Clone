import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // Import Leaflet for additional map options (optional)

const containerStyle = {
  width: "100%",
  height: "100%",
};

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  // Get the initial position and update the current position every 1 second
  useEffect(() => {
    // First, get the user's initial position
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    // Clean up the watch on unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            console.log('Position updated:', latitude, longitude);
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });
    };

    updatePosition(); // Initial position update

    const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds

}, []);

  if (!currentPosition) return <div>Loading...</div>;

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      style={containerStyle}
      whenCreated={(map) => {
        // If needed, customize the map options here (such as zoom, controls, etc.)
        map.on("move", () => {
          // Handle any events on map move, if needed
        });
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={currentPosition}>
        <Popup>
          Current Location: {currentPosition.lat}, {currentPosition.lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveTracking;
