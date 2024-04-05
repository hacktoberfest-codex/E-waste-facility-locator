import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import NavbarResponsive from "./components/NavbarResponsive/NavbarResponsive";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Growth from "./components/Growth/Growth";
import Questions from "./components/Questions/Questions";
import Programs from "./components/Programs/Programs";
import Footer from "./components/Footer/Footer";
import LocationDisplay from "./components/LocationComponent/LocationComponent";
import TomTomMap from "./components/Map/TomTomMap"; // Import the map component
import { programs_shopper } from "./constants/programs_shopper";

const App = () => {
  const [hamActive, setHamActive] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div className="App">
      <Navbar hamActive={hamActive} setHamActive={setHamActive} />
      <NavbarResponsive hamActive={hamActive} />
      <Hero />
      <br />
      <br />
      <br />
      <br />
      {latitude && longitude && (
        <TomTomMap latitude={latitude} longitude={longitude} />
      )}

      {/* <LocationDisplay /> */}
      <Features />
      <Growth />
      <Questions />
      <Programs programs={programs_shopper} />
      <Footer />
    </div>
  );
};

export default App;
