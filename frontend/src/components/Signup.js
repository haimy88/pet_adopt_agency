import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Modal from "@mui/material/Modal";
import { useModalContext } from "../contexts/ModalContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useWindowSize } from "../hooks/windowSize";

export default function Login() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const windowSize = useWindowSize();

  const { handleLoginOpen, signupOpen, handleSignupOpen, handleSignupClose } =
    useModalContext();

  const { signUp } = useAuthContext();

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const inputStyle = { margin: "8px 0" };
  const buttonStyle = { margin: "8px 0" };
  const buttonStyleSmallWindow = { backgroundColor: "#E56B6B" };

  useEffect(() => {
    setSuccess("");
    setError("");
  }, [signupOpen]);

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
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  async function handleSubmit() {
    let password = newPassword;
    let passwordconfirm = newPasswordConfirm;
    if (password !== passwordconfirm) {
      return setError("Passwords do not match");
    }
    let error = "";
    try {
      const new_user = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email.toLowerCase(),

        password: newPassword,
        repassword: newPasswordConfirm,
      };
      setError("");
      setLoading(true);
      const response = await signUp(new_user);
      if (response.error) {
        error = response.error.response.data;
        throw new Error(error);
      }
      setSuccess(response.data);
    } catch {
      setError(error || "Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="app_bar_button">
        <Button
          variant="contained"
          color="primary"
          sx={windowSize[1] < 450 && buttonStyleSmallWindow}
          onClick={handleSignupOpen}
        >
          Sign Up
        </Button>
      </div>
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Create An Account</h2>
              {error && (
                <Alert style={inputStyle} severity="error">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert style={inputStyle} severity="success">
                  {success}
                  <Button size="small" onClick={handleSignupClose}>
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
              required
              style={inputStyle}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <TextField
              label="Last Name"
              placeholder="Enter Last Name"
              onChange={(e) => handleLastName(e.target.value)}
              fullWidth
              required
              style={inputStyle}
              onKeyDown={(e) => handleKeyDown(e)}
            />{" "}
            <TextField
              label="Email"
              placeholder="Enter email"
              onChange={(e) => handleEmail(e.target.value)}
              fullWidth
              required
              style={inputStyle}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <TextField
              label="Phone Number"
              placeholder="Enter Phone Number"
              onChange={(e) => handlePhoneNumber(e.target.value)}
              fullWidth
              required
              style={inputStyle}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              onChange={(e) => handlePassword(e.target.value)}
              fullWidth
              required
              style={inputStyle}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <TextField
              label="PasswordConfirm"
              placeholder="Confirm password"
              type="password"
              onChange={(e) => handlePasswordConfirm(e.target.value)}
              fullWidth
              required
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
            >
              Sign Up
            </Button>
            <Typography>
              {" "}
              Already have an account?
              <Button
                onClick={() => {
                  handleLoginOpen();
                  handleSignupClose();
                }}
                sx={{ backgroundColor: "#9B1CA5" }}
              >
                Login
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
}
