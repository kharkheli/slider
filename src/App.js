import React, { useState } from "react";
import Slider from "./customSlider/customSlider";
import "./App.css";

function App() {
  const [play, setPlay] = useState(false);
  return (
    <div className="App">
      {play ? (
        <Slider />
      ) : (
        <div>
          <button onClick={() => setPlay(true)}>Play</button>
          <button onClick={() => openFullscreen()}>Fullscreen</button>
        </div>
      )}
    </div>
  );
}

const elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

export default App;
