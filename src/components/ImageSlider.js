import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css"; // import custom css

const ImageSlider = () => {
  /* SLIDER CLICK */
  const sliderRef = useRef(null);

  const handleImageClick = () => {
    // Move to the next slide when the image is clicked
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };

  // url with the limit parameter
  const url = "https://api.thecatapi.com/v1/images/search";
  // my catapi key
  const api_key =
    "api_key=live_kaZ9qcSlxURYaQ9VS8rj2PmswMbyEGC1Jms5Rj1RrWXe3TPevS6hbirpwvukRgbb";

  const [catImages, setCatImages] = useState([]);

  useEffect(() => {
    fetchCatImages();
  }, []);

  const fetchCatImages = async () => {
    try {
      const response = await axios.get(url, {
        params: {
          limit: 10, // Fetch 10 images
        },
        headers: {
          "x-api-key": api_key,
        },
      });
      console.log(response.data);
      setCatImages(response.data);
    } catch (error) {
      console.error("Error fetching cat images:", error);
    }
  };

  return (
    <div className="container">
      <section className="slider">
        <Slider ref={sliderRef} {...settings}>
          {catImages.map((image) => {
            return (
              <div
                className={"slide-container"}
                key={image.id}
                onClick={handleImageClick}
              >
                <img src={image.url} alt="meow!" className="image" />
              </div>
            );
          })}
        </Slider>
      </section>
    </div>
  );
};

export default ImageSlider;
