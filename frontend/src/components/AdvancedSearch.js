import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import { usePetContext } from "../contexts/PetContext";
import { useModalContext } from "../contexts/ModalContext";
import { useState } from "react";

export default function AdvancedSearch() {
  const [status, setStatus] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [breed, setBreed] = useState();
  const [minHeight, setMinHeight] = useState();
  const [maxHeight, setMaxHeight] = useState();
  const [minWeight, setMinWeight] = useState();
  const [maxWeight, setMaxWeight] = useState();
  const { advancedSearchOpen, handleAdvancedSearchClose } = useModalContext();
  const { advancedSearchPets } = usePetContext();

  function handleType(e) {
    setType(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleBreed(e) {
    setBreed(e.target.value);
  }

  function handleMinHeight(e) {
    setMinHeight(e.target.value);
  }
  function handleMaxHeight(e) {
    setMaxHeight(e.target.value);
  }

  function handleMinWeight(e) {
    setMinWeight(e.target.value);
  }

  function handleMaxWeight(e) {
    setMaxWeight(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  async function handleSubmit() {
    let query = {};
    if (status) {
      query.status = status;
    }
    if (name) {
      query.name = name;
    }
    if (type) {
      query.type = type;
    }
    if (breed) {
      query.breed = breed;
    }
    if (minHeight) {
      query.minHeight = minHeight;
    }
    if (maxHeight) {
      query.maxHeight = maxHeight;
    }
    if (minWeight) {
      query.minWeight = minWeight;
    }
    if (maxWeight) {
      query.maxWeight = maxWeight;
    }
    await advancedSearchPets(query);
    resetSearch();
    handleAdvancedSearchClose();
  }

  const resetSearch = () => {
    setStatus();
    setName();
    setType();
    setBreed();
    setMinHeight();
    setMaxHeight();
    setMinWeight();
    setMaxWeight();
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const inputStyle = { margin: "8px 0" };
  const buttonStyle = { margin: "8px 0" };

  return (
    <Modal
      open={advancedSearchOpen}
      onClose={handleAdvancedSearchClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <SearchIcon />
            </Avatar>
            <h2>Advanced Search</h2>
          </Grid>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            onChange={handleStatus}
            className="status_dropdown"
          >
            <MenuItem value={"Available"}>Available</MenuItem>
            <MenuItem value={"Fostered"}>Fostered</MenuItem>
            <MenuItem value={"Adopted"}>Adopted</MenuItem>
          </Select>
          <TextField
            label="Name"
            placeholder="Enter username"
            onChange={handleName}
            fullWidth
            style={inputStyle}
            onKeyDown={handleKeyDown}
          />
          <TextField
            label="Type"
            placeholder="Enter password"
            onChange={handleType}
            fullWidth
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
          <TextField
            label="Breed"
            placeholder="Enter password"
            onChange={handleBreed}
            fullWidth
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
          <TextField
            label="Height (min)"
            placeholder="Enter password"
            onChange={handleMinHeight}
            fullWidth
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
          <TextField
            label="Height (max)"
            placeholder="Enter password"
            onChange={handleMaxHeight}
            fullWidth
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
          <TextField
            label="Weight (min)"
            placeholder="Enter password"
            onChange={handleMinWeight}
            fullWidth
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
          <TextField
            label="Weight (max)"
            placeholder="Enter password"
            onChange={handleMaxWeight}
            fullWidth
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
          {/* <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          /> */}
          <Button
            style={buttonStyle}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Paper>
      </Grid>
    </Modal>
  );
}
