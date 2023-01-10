import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import { useModalContext } from "../contexts/ModalContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useWindowSize } from "../hooks/windowSize";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    loginOpen,
    handleLoginOpen,
    handleLoginClose,
    handleSignupOpen,
    handleForgotPasswordOpen,
  } = useModalContext();

  const { login } = useAuthContext();

  const windowSize = useWindowSize();

  useEffect(() => {
    setError();
  }, [loginOpen]);

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 290,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const inputStyle = { margin: "8px 0" };
  const buttonStyle = { margin: "8px 0" };
  const buttonStyleSmallWindow = { backgroundColor: "#E56B6B" };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  async function handleSubmit() {
    const user = {
      email: email.toLowerCase(),
      password: password,
    };
    let error = "";
    try {
      setError("");
      setLoading(true);
      const logged_in = await login(user);
      error = logged_in.error.response.data;
      if (logged_in.error) {
        throw new Error(error);
      }
    } catch (err) {
      setError(error || "Failed to login");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="app_bar_button">
        <Button
          color="primary"
          variant="contained"
          onClick={handleLoginOpen}
          sx={windowSize[1] < 450 && buttonStyleSmallWindow}
        >
          Log In
        </Button>
      </div>
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Log In</h2>
              {error && (
                <Alert style={inputStyle} severity="error">
                  {error}
                </Alert>
              )}
            </Grid>
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
              label="Password"
              placeholder="Enter password"
              onChange={(e) => handlePassword(e.target.value)}
              type="password"
              fullWidth
              required
              style={inputStyle}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
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
              Sign In
            </Button>
            <Typography>
              <Button
                onClick={() => {
                  handleLoginClose();
                  handleForgotPasswordOpen();
                }}
              >
                Forgot Password?
              </Button>
            </Typography>
            <Typography>
              {" "}
              Don't have an account?
              <Button
                onClick={() => {
                  handleSignupOpen();
                  handleLoginClose();
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
}
