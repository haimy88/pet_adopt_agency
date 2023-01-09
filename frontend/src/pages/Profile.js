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
import { useWindowSize } from "../hooks/windowSize";

export default function Profile() {
  const { currentUser } = useAuthContext();

  const { userRequests } = useUserContext();

  const { handleProfileFormOpen, handleProfileFormClose } = useModalContext();

  const windowSize = useWindowSize();

  useEffect(() => handleProfileFormClose(), []);

  const profile_html = (
    <>
      <div className="profile_wrapper">
        <ProfileForm />
        <div className="profile_top">
          <Box
            sx={{
              "& button": { m: 1 },
              display: "flex",
              justifyContent: "space-around",
              ml: 5,
              mr: 5,
            }}
          >
            <Box
              component="div"
              textAlign="center"
              sx={{
                whiteSpace: "normal",
                pl: 3,
                pr: 3,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div className="person_icon">
                <PersonIcon fontSize="lg" />
              </div>
              <div className="profile_name">
                {currentUser.firstName} {currentUser.lastName}
              </div>
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
          <Paper sx={{ mt: 10, maxWidth: "60vw", padding: 5 }}>
            <Box
              component="div"
              textAlign="center"
              sx={{
                whiteSpace: "normal",
                // fontSize: "4vh",
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
                // fontSize: "4vh",
                textAlign: "left",
                ml: 2,
              }}
            >
              {currentUser.email}
            </Box>
            <Box
              component="div"
              textAlign="center"
              sx={{
                whiteSpace: "normal",
                // fontSize: "4vh",
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
                // fontSize: "4vh",
                textAlign: "left",
                ml: 2,
              }}
            >
              {currentUser.phoneNumber}
            </Box>
          </Paper>
          <Paper
            sx={{
              mt: 4,
              height: 400,
              maxWidth: "60vw",
              width: windowSize[1] > 950 ? 500 : "80vw",
            }}
          >
            <Box
              component="div"
              textAlign="center"
              sx={{
                whiteSpace: "normal",

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
