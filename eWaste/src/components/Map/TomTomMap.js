import React, { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";

const TomTomMap = ({ latitude, longitude }) => {
  useEffect(() => {
    // Create map instance
    const map = tt.map({
      key: "KGmOKFqZAppZq9ncVSIy3v3ptCSMimaW",
      container: "map", // HTML element ID where the map will be rendered
      center: [longitude, latitude], // Center of the map based on provided latitude and longitude
      zoom: 14, // Zoom level
    });

    // Add marker for current location
    new tt.Marker({
      color: "red", // Set marker color to red
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Customize map controls
    map.addControl(new tt.NavigationControl());
    map.addControl(new tt.ScaleControl());

    // Clean up
    return () => {
      map.remove(); // Remove the map when component unmounts
    };
  }, [latitude, longitude]); // Re-run this effect when latitude or longitude changes

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    ></div>
  ); // Render map container with styles
};

export default TomTomMap;
