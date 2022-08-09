import React from "react";
import { Box, Grid, Container } from "@mui/material";
import MiniCard from "../components/MiniCard";

export default function UserInfo({ userInfo }) {
  return (
    <>
      <Container>
        <Box
          component="div"
          sx={{
            whiteSpace: "normal",
            marginBottom: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {userInfo[1].firstName} {userInfo[1].lastName}
        </Box>
        <Box component="div" sx={{ whiteSpace: "normal", marginBottom: 1 }}>
          Saved Pets: {userInfo[0].saved.length < 1 && "None"}
        </Box>
        <Grid
          container
          sx={{
            whiteSpace: "normal",
            alignItems: "center",
          }}
        >
          {userInfo[0].saved.map((pet, index) => {
            return (
              <Grid md={6} key={index}>
                <MiniCard pet={pet} key={index} />
              </Grid>
            );
          })}
        </Grid>
        <Box
          component="div"
          sx={{ whiteSpace: "normal", marginBottom: 1, marginTop: 2 }}
        >
          Owned Pets: {userInfo[0].owned.length < 1 && "None"}
        </Box>
        <Grid
          container
          sx={{
            whiteSpace: "normal",
            alignItems: "center",
          }}
        >
          {userInfo[0].owned.map((pet, index) => {
            return (
              <Grid md={6} key={index}>
                <MiniCard pet={pet} key={index} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
