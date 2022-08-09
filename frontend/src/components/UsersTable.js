import React from "react";
import { useState } from "react";
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
import UserInfo from "../components/UserInfo";
import Popup from "./Popup";

const headCells = [
  { id: "FirstName", label: "First Name" },
  { id: "LastName", label: "Last Name" },
  { id: "email", label: "email" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "actions", label: "", disableSorting: true },
];

export default function UsersTable() {
  const { allUsers, getFullUserInfo } = useAdminContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleGetInfo = async (item) => {
    const info = await getFullUserInfo(item);
    setUserInfo(info);
    setOpenPopup(true);
  };

  const { TblContainer, TblHead, TblPagination, petsAfterPagingAndSorting } =
    UseTable(allUsers, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.email.toLowerCase().includes(target.value) ||
              x.lastName.toLowerCase().includes(target.value) ||
              x.firstName.toLowerCase().includes(target.value) ||
              x.phoneNumber.toLowerCase().includes(target.value)
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
              label="Search Users"
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
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleGetInfo(item);
                      }}
                      color="success"
                    >
                      See Pets
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="User Information"
        >
          {" "}
          <UserInfo userInfo={userInfo} setOpenPopup={setOpenPopup} />
        </Popup>
      </div>
    </div>
  );
}
