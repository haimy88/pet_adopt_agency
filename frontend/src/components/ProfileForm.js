import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, Button, Alert } from "@mui/material";
import Modal from "@mui/material/Modal";
import PersonIcon from "@mui/icons-material/Person";
import { useModalContext } from "../contexts/ModalContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";

export default function ProfileForm() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState();
  const [bio, setBio] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { profileFormOpen, handleProfileFormClose } = useModalContext();

  const { currentUser, setCurrentUser } = useAuthContext();

  const { editUserInfo } = useUserContext();

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const inputStyle = { margin: "8px 0" };
  const buttonStyle = { margin: "8px 0" };

  useEffect(() => {
    if (!profileFormOpen) {
      setError();
      setSuccess();
    }
  }, [profileFormOpen]);

  const handleFirstName = (e) => {
    setFirstName(e);
  };

  const handleLastName = (e) => {
    setLastName(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e);
  };

  const handlePassword = (e) => {
    setNewPassword(e);
  };

  const handlePasswordConfirm = (e) => {
    setNewPasswordConfirm(e);
  };

  const handleBio = (e) => {
    setBio(e);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  async function handleSubmit() {
    const edited_user = {
      id: currentUser.id,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      bio: bio,
    };
    let password = newPassword;
    let passwordconfirm = newPasswordConfirm;
    if (password) {
      if (password !== passwordconfirm) {
        return setError("Passwords do not match");
      }
      edited_user.password = newPassword;
      edited_user.repassword = newPasswordConfirm;
    }
    try {
      setError("");
      setLoading(true);
      const response = await editUserInfo(edited_user);
      setSuccess("Updated Successfully");
    } catch {
      setError("Failed to Update");
    }
    setLoading(false);
  }

  return (
    <Modal
      open={profileFormOpen}
      onClose={handleProfileFormClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <PersonIcon />
            </Avatar>
            <h2>Edit Your Information</h2>
            {error && (
              <Alert style={inputStyle} severity="error">
                {error}
              </Alert>
            )}
            {success && (
              <Alert style={inputStyle} severity="success">
                {success}
                <Button size="small" onClick={handleProfileFormClose}>
                  Close
                </Button>
              </Alert>
            )}
          </Grid>
          <TextField
            label="First Name"
            placeholder="Enter First Name"
            onChange={(e) => handleFirstName(e.target.value)}
            fullWidth
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            label="Last Name"
            placeholder="Enter Last Name"
            onChange={(e) => handleLastName(e.target.value)}
            fullWidth
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />{" "}
          <TextField
            label="Email"
            placeholder="Enter email"
            onChange={(e) => handleEmail(e.target.value)}
            fullWidth
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            label="Phone Number"
            placeholder="Enter Phone Number"
            onChange={(e) => handlePhoneNumber(e.target.value)}
            fullWidth
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            id="outlined-basic"
            label="bio"
            variant="outlined"
            multiline
            rows={3}
            onChange={(e) => handleBio(e.target.value)}
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            label="New Password"
            placeholder="New password"
            type="password"
            onChange={(e) => handlePassword(e.target.value)}
            fullWidth
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            label="Repeat New Password"
            placeholder="Confirm new password"
            type="password"
            onChange={(e) => handlePasswordConfirm(e.target.value)}
            fullWidth
            style={inputStyle}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Button
            style={buttonStyle}
            disabled={loading}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            Confirm Changes
          </Button>
        </Paper>
      </Grid>
    </Modal>
  );
}
