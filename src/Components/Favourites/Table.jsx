import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomPagination from "../Pagination.jsx/CustomPagination";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";

// const getLocalList = () => {
//   const listData = localStorage.getItem("lists");
//   // console.log(listData);

//   if (listData) {
//     return JSON.parse(localStorage.getItem("lists"));
//   } else {
//     return [];
//   }
// };

export default function DataTable({ list, setList }) {
  const [data, setData] = React.useState(list);

  const handleClick = (id) => {
    const newList = data.filter((l) => {
      return l[0] !== id;
    });
    setData(newList);
    setList(newList);
  };

  React.useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{/* <b>Sr No.</b> */}</TableCell>
              <TableCell>
                <b>Title</b>
              </TableCell>
              <TableCell align="right">
                <b>Genres</b>
              </TableCell>
              <TableCell align="right">
                <b>Rating</b>
              </TableCell>
              <TableCell>
                <div
                  style={{ display: "flex", justifyContenet: "space-around" }}
                >
                  <b>Delete</b>
                  <span>
                    <DeleteIcon sx={{ color: "#ba000d" }} />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${d[4]}`}
                    style={{ width: "120px", height: "80px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {d[1]}
                </TableCell>
                <TableCell align="right" sx={{ textTransform: "uppercase" }}>
                  {d[2]}
                </TableCell>
                <TableCell align="right">{d[3]}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleClick(d[0])}>
                    <span>
                      <DeleteIcon sx={{ color: "#ba000d" }} />
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination />
    </>
  );
}
