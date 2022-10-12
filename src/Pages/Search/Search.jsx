import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../Components/Pagination.jsx/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";

export default function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setContent(data.data.results);
      // console.log(data.data.results);
      setNumOfPages(data.data.total_pages);
    } catch (err) {
      console.log(err);
      // return;
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // setSearchText("");
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="search" style={{ display: "flex" }}>
          <TextField
            sx={{ flex: 1 }}
            label="Search"
            variant="filled"
            className="searchBox"
            style={{ flex: 1 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab
            style={{ width: "50%" }}
            label="Search Movies"
            // value="tv"
          />
          <Tab
            style={{ width: "50%" }}
            label="Search TV Series"
            // value="movie"
          />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.original_title || c.original_name}
              date={c.release_date || c.first_air_date}
              media_type={type ? "tv" : "movie"}
              vote_average={Math.round(c.vote_average * 10) / 10}
            />
          ))}
        {searchText &&
          content.length === 0 &&
          (type ? <h2>No TV Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}
