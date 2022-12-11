import React, { useState, useEffect, useRef } from "react";

import Carousel from "infinite-react-carousel";
import { act } from "react-dom/test-utils";

export default function Slider() {
  const videoRef = useRef(null);
  const [slides, setSlides] = useState([
    {
      type: "video",
      path: "https://www.w3schools.com/html/mov_bbb.mp4",
      play_seconds: 10,
    },
    {
      type: "photo",
      path: "https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg",
      play_seconds: 5,
    },
    {
      type: "photo",
      path: "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg",
      play_seconds: 5,
    },
    {
      type: "photo",
      path: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      play_seconds: 5,
    },
    {
      type: "video",
      path: "/video1.mp4",
      play_seconds: 10,
    },
  ]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const playTimer = setTimeout(() => {
      if (videoRef.current) videoRef.current.play();
    }, 200);
    const timer = setTimeout(() => {
      const next = document.getElementsByClassName("carousel-next")[0];
      next.click();
      setActive((active + 1) % slides.length);
    }, slides[active].play_seconds * 1000 + 200);
    return () => {
      clearTimeout(playTimer);
      clearTimeout(timer);
    };
  }, [active]);
  console.log(active);
  return (
    <div
      // onClick={() => openFullscreen()}

      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Carousel
        onSwipe={(d) => {
          console.log(d);
        }}
        swipe={false}
      >
        {slides.map((slide, index) => {
          return (
            <div
              key={slide.path}
              className={`${style.slide} ${
                active === index
                  ? style.active
                  : next === index
                  ? style.next
                  : previous === index
                  ? style.prev
                  : ""
              }`}
            >
              {slide.type === "video" ? (
                <video
                  style={{ width: "100%", height: "100vh", objectFit: "fill" }}
                  // controls
                  ref={slide.path == slides[active].path ? videoRef : null}
                >
                  <source src={slide.path} type="video/mp4" />{" "}
                </video>
              ) : (
                <img
                  src={slide.path}
                  alt="mountain"
                  className="slide-image"
                  style={{ width: "100%", height: "100vh", objectFit: "fill" }}
                />
              )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
