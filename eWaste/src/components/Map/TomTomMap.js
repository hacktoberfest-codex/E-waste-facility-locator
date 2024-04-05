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

      // Add location markers with black color for e-waste centers
      const ewasteMarkers = [
        {
          name: "E-waste Center 1",
          coordinates: [longitude + 0.005, latitude - 0.005],
        },
        {
          name: "E-waste Center 2",
          coordinates: [longitude - 0.003, latitude + 0.006],
        },
        {
          name: "E-waste Center 3",
          coordinates: [longitude + 0.008, latitude + 0.002],
        },
      ];

      const newLocationMarkers = ewasteMarkers.map((ewasteMarker) => {
        const marker = new tt.Marker({
          color: "black",
        })
          .setLngLat(ewasteMarker.coordinates)
          .addTo(map);

        // Create a custom popup for each location marker
        const popupContent = document.createElement("div");
        popupContent.innerHTML = `<div style="font-weight: bold; font-size: 16px; padding: 10px;">${ewasteMarker.name}</div>`;
        const popup = new tt.Popup({
          offset: 35,
          closeButton: false,
        }).setDOMContent(popupContent);
        marker.setPopup(popup);

        // Add label for each location marker
        const label = new tt.Marker({
          element: createLabelElement(ewasteMarker.name),
        })
          .setLngLat(ewasteMarker.coordinates)
          .addTo(map);

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

  const createLabelElement = (text) => {
    const label = document.createElement("div");
    label.className = "marker-label";
    label.textContent = text;
    return label;
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
