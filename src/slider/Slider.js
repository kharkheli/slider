import React, { useState, useEffect, useRef, useMemo } from "react";
import style from "./slider.module.css";

export default function Slider() {
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(null);
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

  const nextSlide = useMemo(() => {
    return (current + 1) % slides.length;
  }, [current]);

  const previousSlide = useMemo(() => {
    if (current === null) return null;
    return (current - 1 + slides.length) % slides.length;
  }, [current]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    const videoTimer = setTimeout(() => {
      if (videoRef.current) videoRef.current.play();
    }, 1000);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, slides[current || 0].play_seconds * 1000 + 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(videoTimer);
    };
  }, [current]);
  return (
    <div className={style.slider_cont}>
      {slides.map((slide, index) => {
        return (
          <div
            key={slide.path}
            className={`${style.slide} ${
              current === index
                ? style.active
                : nextSlide === index
                ? style.next
                : previousSlide === index
                ? style.prev
                : current === null && index === 0
                ? style.initial
                : ""
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={(current || 0) === index ? videoRef : null}
                className={style.slide_content}
              >
                <source src={slide.path} />
              </video>
            ) : (
              <img className={style.slide_content} src={slide.path} />
            )}
          </div>
        );
      })}
    </div>
  );
}
