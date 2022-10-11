import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

export default function Genres({
  type,
  selectedGenres,
  setSelectGenres,
  genres,
  setGenres,
  setPage,
}) {
  const handleAdd = (genre) => {
    setSelectGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleDelete = (genre) => {
    setGenres([...genres, genre]);
    setSelectGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    // console.log({ data });
    setGenres(data.genres);
  };

  //   console.log(genres);

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            color="primary"
            clickable
            onDelete={() => handleDelete(genre)}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
}
