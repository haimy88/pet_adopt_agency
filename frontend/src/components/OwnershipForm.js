import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Alert,
  Modal,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useModalContext } from "../contexts/ModalContext";
import { useUserContext } from "../contexts/UserContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Pets from "@mui/icons-material/Pets";

export default function OwnershipForm(props) {
  const { pet } = props;
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState();

  const { ownershipRequestOpen, handleOwnershipRequestClose } =
    useModalContext();

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const inputStyle = { margin: "8px 0" };
  const buttonStyle = { margin: "8px 0" };

  const { sendOwnershipRequest } = useUserContext();

  useEffect(() => setType(), []);

  const handleRequestType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const new_ownership_request = {
      type: type,
      startDate: startDate,
      endDate: endDate || null,
      petId: pet._id,
    };
    let response = await sendOwnershipRequest(new_ownership_request, pet._id);
    response ? setSuccess(response) : setError("Error in making the request");
    setLoading(false);
  };

  useEffect(() => setSuccess(), []);

  return (
    <>
      <Modal
        open={ownershipRequestOpen}
        onClose={() => {
          handleOwnershipRequestClose();
          setType();
          setError();
          setSuccess();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center" sx={{ marginBottom: 2 }}>
              <Avatar style={avatarStyle}>
                <Pets />
              </Avatar>
              {error && (
                <Alert style={inputStyle} severity="error">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert style={inputStyle} severity="success">
                  {success}
                  <Button size="small" onClick={handleOwnershipRequestClose}>
                    Close
                  </Button>
                </Alert>
              )}
            </Grid>
            <InputLabel sx={{ mb: 1 }} id="demo-simple-select-label">
              Type of Ownership
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              value={type}
              onChange={handleRequestType}
              className="status_dropdown"
            >
              <MenuItem value={"Foster"}>Foster</MenuItem>
              <MenuItem value={"Adoption"}>Adoption</MenuItem>
            </Select>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ marginBottom: 2, marginTop: 2 }}
            >
              {type && (
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
              {type === "Foster" && (
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mt: 2 }} {...params} />
                  )}
                />
              )}
            </Grid>
            <Button
              style={buttonStyle}
              disabled={loading}
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Submit Request
            </Button>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
}
