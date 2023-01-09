import React from "react";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { UseTable } from "./UseTable";
import {
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWindowSize } from "../hooks/windowSize";

const headCells = [
  { id: "type", label: "Request Type" },
  { id: "user", label: "User" },
  { id: "petName", label: "Pet" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date" },
  { id: "status", label: "Status" },
  { id: "actions", label: "", disableSorting: true },
];

export default function RequestTableUser() {
  const { userRequests } = useUserContext();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const windowSize = useWindowSize();

  const { TblContainer, TblHead, TblPagination, petsAfterPagingAndSorting } =
    UseTable(userRequests, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.type.toLowerCase().includes(target.value) ||
              x.petName.toLowerCase().includes(target.value) ||
              x.status.toLowerCase().includes(target.value) ||
              x.userFirstName.toLowerCase().includes(target.value) ||
              x.startDate.toLowerCase().includes(target.value) ||
              x.status.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <div className="table_wrapper_user_requests">
      <Paper
        sx={{
          margin: windowSize[1] < 950 ? 0 : 5,
          padding: 4,
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <TableContainer sx={windowSize[1] < 950 && { maxWidth: "80vw" }}>
          <Toolbar>
            <TextField
              variant="outlined"
              label="Search Requests"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
              sx={{ marginBottom: 2, marginLeft: -3, marginTop: 1 }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {petsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.userFirstName}</TableCell>
                  <TableCell>{item.petName}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{item.endDate}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </TableContainer>
      </Paper>
    </div>
  );
}
