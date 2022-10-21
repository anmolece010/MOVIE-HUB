import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomPagination from "../Pagination.jsx/CustomPagination";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";

export default function DataTable({ list, setList, data, setData }) {
  const handleClickDelete = (id) => {
    const newData = data.filter((l) => {
      return l[0] !== id;
    });
    setData(newData);
    const newList = list.filter((l) => {
      return l[0] !== id;
    });
    setList(newList);
  };

  React.useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(list));
  }, [list, data]);

  return (
    <>
      <TableContainer className="favtable">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>
                <b>Poster</b>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <b>Title</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                <b>Genres</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                <b>Rating</b>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <div style={{ display: "flex", justifyContenet: "center" }}>
                  <b>Delete</b>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    alt={d[1]}
                    src={`https://image.tmdb.org/t/p/w300/${d[4]}`}
                    style={{
                      width: "120px",
                      height: "80px",
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" sx={{ color: "white" }}>
                  {d[1]}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ textTransform: "uppercase", color: "white" }}
                >
                  {d[2]}
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  {d[3]}{" "}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleClickDelete(d[0])}>
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
