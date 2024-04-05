import React, { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";

const TomTomMap = ({ latitude, longitude }) => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [locationMarkers, setLocationMarkers] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const locations = [
    {
      pincode: 751030,
      city: "Jagamara",
      ewastecentername: "M/s. Green Waves Environmental Solution",
    },
    {
      pincode: 756019,
      city: "Armala",
      ewastecentername: "Veera Waste Management Systems",
    },
    {
      pincode: 756001,
      city: "Azimabad",
      ewastecentername: "Binbag Recycling Services Pvt. Ltd",
    },
    {
      pincode: 751007,
      city: "Saheed Nagar",
      ewastecentername: "World Scrap Recycling Solutions (P) Ltd",
    },
    {
      pincode: 751022,
      city: "Acharaya Vihar",
      ewastecentername: "Greenscape Eco Management Private ltd",
    },
  ];

  useEffect(() => {
    let map;

    const initializeMap = () => {
      map = tt.map({
        key: "KGmOKFqZAppZq9ncVSIy3v3ptCSMimaW",
        container: mapContainer.current,
        center: [longitude, latitude],
        zoom: 15,
      });

      setMapInstance(map);

      // Add user marker for current location
      const userMarker = new tt.Marker({
        color: "red",
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
      setUserMarker(userMarker);

      // Add location markers with black color
      const newLocationMarkers = locations.map((location) => {
        const marker = new tt.Marker({
          color: "black",
        })
          .setLngLat([0, 0]) // Placeholder coordinates
          .addTo(map);

        // Create a custom tooltip for each location marker
        const tooltip = new tt.Popup({ offset: 35 }).setHTML(
          `<b>${location.ewastecentername}</b>`
        );
        marker.setPopup(tooltip);

        return marker;
      });
      setLocationMarkers(newLocationMarkers);

      map.addControl(new tt.NavigationControl());
      map.addControl(new tt.ScaleControl());
      setMapLoaded(true);

      // Zoom to user's location with animation
      map.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        speed: 0.2,
      }); // Adjust zoom, center, and speed for desired animation
    };

    if (!mapInstance) {
      initializeMap();
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [latitude, longitude]);

  useEffect(() => {
    // Update user marker position when latitude or longitude changes
    if (userMarker) {
      userMarker.setLngLat([longitude, latitude]);
    }
  }, [latitude, longitude, userMarker]);

  useEffect(() => {
    // Update location markers position when locations change
    if (locationMarkers.length > 0) {
      locationMarkers.forEach((marker, index) => {
        const { pincode, city } = locations[index];
        fetchCoordinates(pincode, city)
          .then((coordinates) => {
            if (coordinates) {
              marker.setLngLat(coordinates);
            }
          })
          .catch((error) => {
            console.error("Error fetching coordinates:", error);
          });
      });
    }
  }, [locations, locationMarkers]);

  const fetchCoordinates = async (pincode, city) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${city}&postalcode=${pincode}&format=json&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lon), parseFloat(lat)];
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    return null;
  };

  return (
    <div
      ref={mapContainer}
      style={{
        width: "900px",
        height: "800px", // Increased height to ensure markers are fully visible
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        margin: "auto", // Center the map horizontally and vertically
        textAlign: "center",
        transition: mapLoaded ? "transform 0.5s ease-in-out" : "none", // Apply transition when map is loaded
        transform: mapLoaded ? "translateY(0)" : "translateY(100px)", // Slide in animation
      }}
    ></div>
  );
};

export default TomTomMap;
