import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import { img_300, unavailable } from "../../Config/config";
import ContentModal from "../ContentModal/ContentModal";
import { Button } from "@material-ui/core";
import "./content.css";

export default function SingleContent({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  list,
  setList,
  genre,
}) {
  var b = 0;
  const [text, setText] = useState("Add To Favourites");
  const [btncolor, setbtncolor] = useState("secondary");

  const handleclick = ({
    id,
    title,
    media_type,
    vote_average,
    poster,
    genre,
  }) => {
    list.map((l) => {
      if (l[0] === id) {
        b = 1;
      }
    });

    if (b === 0) {
      setList([...list, [id, title, media_type, vote_average, poster, genre]]);
      // console.log(genre);
    }
    // if (text === "Add To Fav") setText("Remove From Fav");
    // if (text === "Remove From Fav") setText("Add To Fav");
  };

  const setBtn = (list) => {
    list.map((l) => {
      if (l[0] === id) {
        setText("Favourite");
        setbtncolor("primary");
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(list));
    setBtn(list);
  }, [list]);

  // console.log(list);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{date} </span>
        </span>
      </ContentModal>
      <div className="addtofavButton">
        <Button
          variant="contained"
          color={btncolor}
          onClick={() =>
            handleclick({ id, title, media_type, vote_average, poster, genre })
          }
        >
          {text}
        </Button>
      </div>
    </div>
  );
}
