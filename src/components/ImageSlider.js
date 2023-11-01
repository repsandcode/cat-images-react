import React, { useEffect, useState } from "react";
import "./ImageSlider.css";
// import { useCallback } from "react";

const ImageSlider = () => {
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const quantity = 3;
      const api_key = `live_kaZ9qcSlxURYaQ9VS8rj2PmswMbyEGC1Jms5Rj1RrWXe3TPevS6hbirpwvukRgbb`;
      const url = `https://api.thecatapi.com/v1/images/search?limit=${quantity}&api_key=${api_key}`;
      const response = await fetch(url, {
        headers: {
          "x-api-key": api_key,
        },
      });
      const data = await response.json();
      console.log(data);
      setCatImages((prevCatImages) => [...prevCatImages, ...data]); // Append new images to the existing images
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Function to handle scroll
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading
      ) {
        // Load more images when user is near the bottom and not already loading
        fetchData();
      }
    };

    // Add event listener for scroll event
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="container">
      <div className="cat-images" id="image-slider">
        {catImages.map((cat) => (
          <img
            key={cat.id}
            className="cat"
            src={cat.url}
            alt={`Cat ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
