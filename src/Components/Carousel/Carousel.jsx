import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../Config/config";
import "./carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState();

  const items = credits?.map((c) => (
    <div className="carouselItems">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c.name}
        onDragStart={handleDragStart}
        className="carouselItem_img"
      />
      <b className="carouselItme_txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchData = async () => {
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      console.log(data.data);
      setCredits(data.data.cast);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      mouseTracking
      items={items}
      disableDotsControls
      disableButtonsControls
    />
  );
};
export default Carousel;
