import React, { useEffect } from "react";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { usePetContext } from "../contexts/PetContext";

export default function (props) {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [breed, setBreed] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [color, setColor] = useState();
  const [diet, setDiet] = useState();
  const [bio, setBio] = useState();
  const [hyperallergenic, setHyperallergenic] = useState();
  const [status, setStatus] = useState();
  const [image, setImage] = useState();
  const [allergenicValue, setAllergenicValue] = useState();
  const { existingPet, setOpenPopup } = props;

  const { addPet, editPet } = usePetContext();

  function handleType(e) {
    setType(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleBreed(e) {
    setBreed(e.target.value);
  }

  function handleHeight(e) {
    setHeight(e.target.value);
  }

  function handleWeight(e) {
    setWeight(e.target.value);
  }

  function handleColor(e) {
    setColor(e.target.value);
  }

  function handleDiet(e) {
    setDiet(e.target.value);
  }

  function handleBio(e) {
    setBio(e.target.value);
  }

  function handleHyperallergenic(e) {
    if (e.target.value === "Yes") {
      setHyperallergenic(true);
      setAllergenicValue("Yes");
    } else {
      setHyperallergenic(false);
      setAllergenicValue("No");
    }
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  useEffect(() => {
    if (existingPet) {
      setName(existingPet.name);
      setType(existingPet.type);
      setBreed(existingPet.breed);
      setHeight(existingPet.height);
      setWeight(existingPet.weight);
      setColor(existingPet.color);
      setDiet(existingPet.diet);
      setBio(existingPet.bio);
      setStatus(existingPet.status);
      existingPet.hyperallergenic
        ? setAllergenicValue("Yes")
        : setAllergenicValue("No");
    }
  }, []);

  useEffect(() => {
    console.log(allergenicValue);
  }, [allergenicValue]);

  const new_pet = {
    name: name,
    type: type,
    bio: bio,
    status: status,
    img: image,
    breed: breed,
    height: height,
    weight: weight,
    color: color,
    dietary_restrictions: diet,
    bio: bio,
    hyperallergenic: hyperallergenic,
    status: status,
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  function onSubmit() {
    let added = null;
    existingPet ? editPet(new_pet, existingPet._id) : (added = addPet(new_pet));
    if (added) {
      setName(); //Todo clear all fields when submitted
    }
    setOpenPopup(false);
    window.location.reload(true);
  }

  const inputStyle = { margin: "8px 0" };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl>
          <TextField
            id="outlined-basic"
            label="Name"
            value={name}
            variant="outlined"
            onChange={handleName}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="Type"
            variant="outlined"
            value={type}
            onChange={handleType}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="Breed"
            variant="outlined"
            value={breed}
            onChange={handleBreed}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="Height (cm)"
            variant="outlined"
            value={height}
            onChange={handleHeight}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="Weight (kg)"
            variant="outlined"
            value={weight}
            onChange={handleWeight}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="Color"
            variant="outlined"
            value={color}
            onChange={handleColor}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="Dietary Restrictions"
            variant="outlined"
            value={diet}
            onChange={handleDiet}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="bio"
            variant="outlined"
            multiline
            value={bio}
            rows={5}
            onChange={handleBio}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </FormControl>
        <div className="pet_form_selects">
          <div>
            <InputLabel id="demo-simple-select-label">
              Hyperallergenic?
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={allergenicValue ? allergenicValue : null}
              label="hyperallergenic"
              onChange={handleHyperallergenic}
              className="status_dropdown"
              style={inputStyle}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status ? status : null}
              label="Age"
              onChange={handleStatus}
              style={inputStyle}
              className="status_dropdown"
            >
              <MenuItem value={"Available"}>Available</MenuItem>
              <MenuItem value={"Fostered"}>Fostered</MenuItem>
              <MenuItem value={"Adopted"}>Adopted</MenuItem>
            </Select>
          </div>
        </div>
        <div className="pet_form_bottom">
          <div className="photo_upload_container">
            {/* <span className="upload_pic_text">Pet Picture</span> */}
            <InputLabel id="demo-simple-select-label">Pet Picture</InputLabel>
            <input
              type="file"
              onChange={handleImageChange}
              name="newImage"
              id="image"
            />
          </div>
          <div className="pet_form_button">
            <Button variant="contained" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );
}
