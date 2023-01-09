import React from "react";
import { useEffect, useState } from "react";
import { usePetContext } from "../contexts/PetContext";
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
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Popup from "./Popup";
import PetForm from "./PetForm";
import { useWindowSize } from "../hooks/windowSize";

const headCells = [
  { id: "name", label: "Pet Name" },
  { id: "type", label: "Type" },
  { id: "breed", label: "Breed" },
  { id: "status", label: "Adoption Status" },
  { id: "actions", label: "", disableSorting: true },
];

export default function PetsTable() {
  const { petData, getAllPets } = usePetContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [existingPet, setExistingPet] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    getAllPets();
  }, []);

  const { deletePet } = usePetContext();

  const windowSize = useWindowSize();

  const { TblContainer, TblHead, TblPagination, petsAfterPagingAndSorting } =
    UseTable(petData, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.type.toLowerCase().includes(target.value) ||
              x.name.toLowerCase().includes(target.value) ||
              x.breed.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleDeletePet = async (pet) => {
    await deletePet(pet);
    window.location.reload(true);
  };

  const openInPopup = (item) => {
    setExistingPet(item);
    setOpenPopup(true);
  };

  useEffect(() => {
    if (!openPopup) setExistingPet(false);
  }, [openPopup]);

  return (
    <div className="dashboard_wrapper">
      <div className="table_wrapper">
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  variant="outlined"
                  label="Search Pets"
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
                  sx={{ marginBottom: 4, marginLeft: -3, marginTop: 1 }}
                />
                <Box sx={{ alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{
                      flexDirection: "row",
                      marginLeft: 2,
                      marginBottom: 1,
                    }}
                    onClick={() => setOpenPopup(true)}
                  >
                    Add New Pet
                  </Button>
                </Box>
              </Box>
            </Toolbar>
            <TblContainer>
              <TblHead />
              <TableBody>
                {petsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.breed}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        sx={{ borderRadius: 2, maxWidth: 5 }}
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        <EditOutlinedIcon fontSize="sm" />
                      </Button>
                      <Button
                        onClick={() => handleDeletePet(item)}
                        color="warning"
                      >
                        <CloseIcon fontSize="sm" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </TableContainer>
        </Paper>
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title={existingPet ? "Edit Pet" : "Create Pet"}
        >
          {" "}
          <PetForm existingPet={existingPet} setOpenPopup={setOpenPopup} />
        </Popup>
      </div>
    </div>
  );
}
