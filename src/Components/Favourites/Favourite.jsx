import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "./Table";
import axios from "axios";
import { ListItemButton } from "@mui/material";

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
      return l[5][0] === id;
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
          <Item sx={{ padding: "5px" }}>
            <div className="sidebar">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <Button onClick={handleClick1}>
                    <Typography>
                      <b>All Genres</b>
                    </Typography>
                  </Button>
                </ListItem>
              </List>
              <List component="nav" aria-label="main mailbox folders">
                {genreslist.map((list, index) => (
                  <ListItem key={index}>
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
          <Item>
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
          </Item>
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Item>
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
