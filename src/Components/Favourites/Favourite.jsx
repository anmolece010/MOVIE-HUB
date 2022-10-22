import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider, List, ListItem, Typography } from "@material-ui/core";

import DataTable from "./Table";
import axios from "axios";
import { ListItemButton } from "@mui/material";
import "./favourite.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const getLocalList = () => {
  const listData = localStorage.getItem("lists");
  // console.log(listData);

  if (listData) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

export default function Favourites({ list, setList }) {
  const [data, setData] = React.useState(getLocalList);
  const [genreslist, setGenresList] = React.useState([]);
  // const [buttonColor, setButtonColor] = React.useState("lightgrey");
  // const [prevId, setPrevId] = React.useState(0);

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenresList(data.genres);
    // console.log(data.genres);
  };

  const handleClick1 = () => {
    setData(getLocalList);
    window.scroll(0, 0);
  };

  const handleClick2 = (id) => {
    const newList = list.filter((l) => {
      if (l[5][0] === id) return l[5][0] === id;
      else if (l[5][1] === id) return l[5][1] === id;
      else if (l[5][2] === id) return l[5][2] === id;
      else if (l[5][3] === id) return l[5][3] === id;
      else if (l[5][4] === id) return l[5][4] === id;
      else if (l[5][5] === id) return l[5][5] === id;
    });
    console.log(newList);
    setData(newList);
    window.scroll(0, 0);
  };

  React.useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item sx={{ backgroundColor: "#212121" }}>
            <div>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem className="allgenrebutton">
                  <ListItemButton onClick={handleClick1}>
                    <Typography>
                      <b>All Genres</b>
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </List>
              <List component="nav" aria-label="main mailbox folders">
                {genreslist.map((list, index) => (
                  <ListItem key={index} className="genreButton">
                    <ListItemButton onClick={() => handleClick2(list.id)}>
                      <Typography>{list.name}</Typography>
                      <Divider />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          {/* <Item>
            <div className="search" style={{ display: "flex" }}>
              <TextField
                sx={{ flex: 1 }}
                label="Search"
                variant="filled"
                className="searchBox"
                style={{ flex: 1 }}
                // onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                variant="contained"
                style={{ marginLeft: 10 }}
                // onClick={fetchSearch}
              >
                <SearchIcon />
              </Button>
            </div>
          </Item> */}
          <Grid item xs={12} sx={{ marginTop: "0px" }}>
            <Item sx={{ backgroundColor: "#212121" }}>
              {data && (
                <DataTable
                  list={list}
                  setList={setList}
                  data={data}
                  setData={setData}
                />
              )}
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
