import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
const GoogleMapComponent = (props) => {
  const [allData, setAllData] = useState(null);
  const [parentDimensions, setParentDimensions] = useState({ height: "100%", width: "100%" });

  useEffect(() => {
    updateParentDimensions();
    window.addEventListener('resize', updateParentDimensions);
    return () => {
      window.removeEventListener('resize', updateParentDimensions);
    };
  }, []);


  useEffect(() => {
    if (props.address) {
      const fetchData = async () => {
        console.log("geocodedLocation1", props.address);
        const geocodedLocation = await geocodeAddress(props.address);
        console.log("geocodedLocation", geocodedLocation);
        setAllData(geocodedLocation);
      };
      fetchData();
    }
  }, [props.address]);

  const updateParentDimensions = () => {
    const parentDiv = document.getElementById("map-parent");
    if (parentDiv) {
      const { clientWidth, clientHeight } = parentDiv;
      setParentDimensions({ width: clientWidth, height: clientHeight });
    }
  };

  const geocodeAddress = async (address) => {
    const { google } = props;
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        console.log("results", results);
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location?.lat(),
            lng: location?.lng(),
          });
        } else {
          console.error(
            "Geocode was not successful for the following reason: ",
            status
          );
          reject(status);
        }
      });
    });
  };

  const mapStyles = {
    width: "100%",
    height: "100%",
  };

 
  console.log("allData", allData, props.address);

  return (
       <div id="map-parent" style={{ height: "400px", width: "100%", justifyContent: "center" ,position:"relative" }}>
      {allData && (
        <Map
          google={props.google}
          zoom={16}
          style={mapStyles}
          initialCenter={allData}
          center={allData}
        >
          <Marker
            position={allData}
            label={{
              text: props.address,
              color: "#203334",
              fontSize: "14px",
            }}
          />
        </Map>
      )}
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyC8fAreSesb5aow6dXU9IVDcarAsTBi6hs",
})(GoogleMapComponent);
