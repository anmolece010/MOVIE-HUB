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
  const handleclick = ({
    id,
    title,
    media_type,
    vote_average,
    poster,
    genre,
  }) => {
    list.map((l) => {
      if (l[0] === id) b = 1;
    });

    if (b === 0) {
      setList([...list, [id, title, media_type, vote_average, poster, genre]]);
      // console.log(genre);
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(list));
  }, [list]);

  return (
    <div>
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
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 0,
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            handleclick({
              id,
              title,
              media_type,
              vote_average,
              poster,
              genre,
            })
          }
        >
          Add To Favourites
        </Button>
      </span>
    </div>
  );
}
