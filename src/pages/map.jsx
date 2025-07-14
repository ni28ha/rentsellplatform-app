import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const MapComponent = () => {
  // Calculate the bounds of all marker positions
  const [bounds, setBounds] = useState(null);

  const onBoundsChange = (newBounds) => {
    setBounds(newBounds);
  };

  const location = {
    lat: 53.4770939,
    lng: -2.2344556,
    text : "ayush"
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
            key: "AIzaSyC8fAreSesb5aow6dXU9IVDcarAsTBi6hs",
        }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={10}
        onChange={({ bounds }) => onBoundsChange(bounds)}
      >

          <AnyReactComponent
            // key={index}
            lat={location.lat}
            lng={location.lng}
            text={location.text}
          />

      </GoogleMapReact>
    </div>
  );
};


const AnyReactComponent = ({ text }) => (
    <div>
      <div
        style={{
          width: "300px",
          backgroundColor: "#757575",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>
          {text}
        </div>
      </div>
      <img
        src={Location} // Use the imported icon file as the src attribute
        alt="Icon"
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    </div>
  );

export default MapComponent;
