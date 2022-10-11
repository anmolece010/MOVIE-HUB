import { createTheme } from "@material-ui/core";
import { Pagination, ThemeProvider } from "@mui/material";
import React from "react";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

export default function CustomPagination({
  setPage,
  numOfPage = 10,
  numOfPages,
}) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          color="primary"
          count={numOfPages}
          size="large"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
}
