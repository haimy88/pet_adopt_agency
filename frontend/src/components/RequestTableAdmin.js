import React from "react";
import { useState, useEffect } from "react";
import { useAdminContext } from "../contexts/AdminContext";
import { UseTable } from "./UseTable";
import {
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const headCells = [
  { id: "type", label: "Request Type" },
  { id: "user", label: "User" },
  { id: "petName", label: "Pet" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date" },
  { id: "status", label: "Status" },
  { id: "actions", label: "", disableSorting: true },
];

export default function RequestTableAdmin() {
  const {
    ownerships,
    getAllOwnerships,
    approveRequest,
    rejectOwnershipRequest,
    confirmReturn,
  } = useAdminContext();

  useEffect(() => getAllOwnerships(), []);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, petsAfterPagingAndSorting } =
    UseTable(ownerships, headCells, filterFn);

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
              x.startDate.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <div className="dashboard_wrapper">
      <div className="table_wrapper">
        <Paper
          sx={{
            margin: 5,
            padding: 4,
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
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
              sx={{ marginBottom: 2, marginLeft: -3 }}
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
                  {(item.status === "Pending Approval" || item.st) && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          approveRequest(item);
                          window.location.reload(true);
                        }}
                        color="success"
                      >
                        <CheckIcon fontSize="sm" />
                      </Button>
                      <Button
                        onClick={() => {
                          rejectOwnershipRequest(item);
                          window.location.reload(true);
                        }}
                        color="warning"
                      >
                        <CloseIcon fontSize="sm" />
                      </Button>
                    </TableCell>
                  )}
                  {item.status === "Approved" && <TableCell></TableCell>}
                  {item.status === "Return Pending" && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          confirmReturn(item);
                          window.location.reload(true);
                        }}
                        color="success"
                      >
                        Confirm Return
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </div>
    </div>
  );
}
