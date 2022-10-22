import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent";
import "./trending.css";
import CustomPagination from "../../Components/Pagination.jsx/CustomPagination";

export default function Trending({ list, setList }) {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    console.log(data.results);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.original_title || c.original_name}
              date={c.release_date || c.first_air_date}
              media_type={c.media_type}
              vote_average={Math.round(c.vote_average * 10) / 10}
              list={list}
              setList={setList}
              genre={c.genre_ids}
              btn={0}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}
