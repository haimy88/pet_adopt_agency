import React, { useEffect } from "react";
import Drawer from "../components/Drawer.tsx";
import { Box, Paper, Container, Button } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import EditOutlinedIcon from "@mui/icons-material/Edit";
import { useModalContext } from "../contexts/ModalContext";
import RequestTableUser from "../components/RequestTableUser";
import ProfileForm from "../components/ProfileForm";
import PersonIcon from "@mui/icons-material/Person";

export default function Profile() {
  const { currentUser } = useAuthContext();

  const { userRequests } = useUserContext();

  const { handleProfileFormOpen, handleProfileFormClose } = useModalContext();

  useEffect(() => handleProfileFormClose(), []);

  const profile_html = (
    <>
      <div className="profile_wrapper">
        <Container>
          <ProfileForm />
          <div className="profile_top">
            <Box
              sx={{
                "& button": { m: 1 },
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Box
                component="div"
                textAlign="center"
                sx={{
                  whiteSpace: "normal",
                  fontSize: "10vh",
                  pl: 3,
                  pr: 3,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div className="person_icon">
                  <PersonIcon fontSize="lg" />
                </div>
                {currentUser.firstName} {currentUser.lastName}
              </Box>
              <div>
                <Button
                  sx={{ fontSize: 18 }}
                  size="medium"
                  onClick={() => handleProfileFormOpen()}
                >
                  Edit Profile <EditOutlinedIcon sx={{ ml: 1 }} />
                </Button>
              </div>
            </Box>
          </div>
          <div className="profile_bottom">
            <Paper sx={{ mt: 10, maxWidth: "60%", padding: 5 }}>
              <div className="profile_bottom_content">
                <Box
                  component="div"
                  textAlign="center"
                  sx={{
                    whiteSpace: "normal",
                    fontSize: "4vh",
                    textAlign: "left",
                  }}
                >
                  Email:
                </Box>
                <Box
                  component="div"
                  textAlign="center"
                  sx={{
                    whiteSpace: "normal",
                    fontSize: "4vh",
                    textAlign: "left",
                    ml: 5,
                  }}
                >
                  {currentUser.email}
                </Box>
                <Box
                  component="div"
                  textAlign="center"
                  sx={{
                    whiteSpace: "normal",
                    fontSize: "4vh",
                    textAlign: "left",
                  }}
                >
                  Phone Number:
                </Box>
                <Box
                  component="div"
                  textAlign="center"
                  sx={{
                    whiteSpace: "normal",
                    fontSize: "4vh",
                    textAlign: "left",
                    ml: 5,
                  }}
                >
                  {currentUser.phoneNumber}
                </Box>
              </div>
            </Paper>
            <Paper sx={{ mt: 4, height: 400, width: 500 }}>
              <Box
                component="div"
                textAlign="center"
                sx={{
                  whiteSpace: "normal",
                  fontSize: "4vh",
                  textAlign: "left",
                  ml: 5,
                  mt: 2,
                }}
              >
                Bio:
                <br></br>
                <Box sx={{ margin: 3 }}>{currentUser.bio || "Add a Bio!"}</Box>
              </Box>
            </Paper>
          </div>
        </Container>
        {userRequests.length > 0 && (
          <>
            <div className="user_requests_title">Your Requests</div>
            <RequestTableUser />
          </>
        )}
      </div>
    </>
  );

  return (
    <div>
      <Drawer profile_html={profile_html} />
    </div>
  );
}
