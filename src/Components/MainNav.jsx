import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@material-ui/core";
import { BottomNavigationAction } from "@mui/material";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  // console.log(navigate);

  React.useEffect(() => {
    if (value === 0) navigate("/trending");
    else if (value === 1) navigate("/movies");
    // else if (value === 2) navigate("/favourites");
    else if (value === 3) navigate("/series");
    else if (value === 4) navigate("/search");
  }, [value, navigate]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
      }}
    >
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Movies"
        icon={<MovieCreationIcon />}
      />
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Serach"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
