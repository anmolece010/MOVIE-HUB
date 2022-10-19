import { Container } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import SimpleBottomNavigation from "./Components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Trending from "./Pages/Trending/Trending";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import Home from "./Components/Home/Home";
import Favourites from "./Components/Favourites/Favourite";
import { useState } from "react";

const getLocalList = () => {
  const listData = localStorage.getItem("lists");
  // console.log(listData);

  if (listData) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getLocalList());

  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route
              path="/trending"
              element={<Trending list={list} setList={setList} />}
            />
            <Route
              path="/movies"
              element={<Movies list={list} setList={setList} />}
            />
            <Route
              path="/favourites"
              element={<Favourites list={list} setList={setList} />}
            />
            <Route
              path="/series"
              element={<Series list={list} setList={setList} />}
            />
            <Route
              path="/search"
              element={<Search list={list} setList={setList} />}
            />
          </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
