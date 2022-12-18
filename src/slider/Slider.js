import React, { useState, useEffect, useRef, useMemo } from "react";
import style from "./slider.module.css";

export default function Slider() {
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [slides, setSlides] = useState([
    // {
    //   type: "video",
    //   filepath: "https://www.w3schools.com/html/mov_bbb.mp4",
    //   seconds: 10,
    // },
    // {
    //   type: "photo",
    //   filepath: "https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg",
    //   seconds: 5,
    // },
    // {
    //   type: "photo",
    //   filepath: "https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg",
    //   seconds: 5,
    // },
    // {
    //   type: "photo",
    //   filepath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    //   seconds: 5,
    // },
    // {
    //   type: "video",
    //   filepath: "/video1.mp4",
    //   seconds: 10,
    // },
  ]);

  const nextSlide = useMemo(() => {
    return (current + 1) % slides.length;
  }, [current]);

  useEffect(() => {
    const href = window.location.href;
    const id = href
      .split("?")
      .find((item) => item.includes("id="))
      .split("=")[1];
    console.log(id);
    fetch(`http://mzekabani.ge/mzekabani.ge/slider/api/api.php?id=${id}`)
      .then((res) => res.json())
      .then((res) =>
        setSlides(
          res.data.map((item) => {
            if (item.filepath.includes("mp4"))
              return {
                ...item,
                type: "video",
              };
            return item;
          })
        )
      );
  }, []);

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

    const interval = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, slides[current || 0].seconds * 1000 + 1000);
    return () => {
      clearTimeout(interval);
      clearTimeout(videoTimer);
    };
  }, [current]);
  return (
    <div className={style.slider_cont}>
      {slides.map((slide, index) => {
        return (
          <div
            key={slide.filepath}
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
                <source src={slide.filepath} />
              </video>
            ) : (
              <img className={style.slide_content} src={slide.filepath} />
            )}
          </div>
        );
      })}
    </div>
  );
}
