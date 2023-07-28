import React, { useState, useRef } from "react";
import { SliderData } from "./SliderData";
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css"; // import custom css

const ImageSlider = ({ slides }) => {
  // const [current, setCurrent] = useState(0);
  // const length = slides.length;

  // const nextSlide = () => {
  //   setCurrent(current === length - 1 ? 0 : current + 1);
  // };

  // const prevSlide = () => {
  //   setCurrent(current === 0 ? length - 1 : current - 1);
  // };

  // if (!Array.isArray(slides) || slides.length <= 0) {
  //   return null;
  // }

  /* SLIDER CLICK */
  const sliderRef = useRef(null);

  const handleImageClick = () => {
    // Move to the next slide when the image is clicked
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="slider">
      {/* <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} /> */}

      <Slider ref={sliderRef} {...settings}>
        {SliderData.map((slide, index) => {
          return (
            <div
              className={"slide-container"}
              key={index}
              onClick={handleImageClick}
            >
              <img src={slide.image} alt="travel" className="image" />
              <div className="dots-container">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default ImageSlider;
