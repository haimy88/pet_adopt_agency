import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MiniCard(props) {
  const { pet } = props;

  return (
    <>
      <Card
        sx={{
          margin: 1,
          display: "flex",
          flexDirection: "row",
          //   maxWidth: 215,
        }}
      >
        <CardMedia
          className="card_image"
          component="img"
          width="auto"
          height="90"
          src={`http://localhost:3080/uploads/${pet.img}`}
          alt="pet image"
          sx={{ maxWidth: 160 }}
        />
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            sx={{ fontSize: 12, margin: 0, padding: 0 }}
          >
            {pet.name}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            sx={{ fontSize: 12, marginTop: 1 }}
          >
            {pet.type}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
