import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton, CardActions, Alert } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import { useUserContext } from "../contexts/UserContext";

export default function ActionAreaCard(props) {
  const { pet } = props;
  const [success, setSuccess] = useState("");
  const { savePet } = useUserContext();

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("activeCard", JSON.stringify(pet));
    navigate("/petpage");
  };

  const handleSave = async () => {
    const saved = await savePet(pet);
    if (saved) {
      setSuccess(saved.data);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: 0 }} className="card_action">
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className="card_image"
            component="img"
            height="200"
            src={`http://localhost:3080/uploads/${pet.img}`}
            alt="pet image"
          />
          <CardContent>
            <div className="card_name_type">
              <Typography gutterBottom variant="h5" component="div">
                {pet.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {pet.type}
              </Typography>
            </div>
            <Typography
              className="card_status"
              gutterBottom
              variant="h6"
              component="div"
            >
              {pet.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pet.bio}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          disableSpacing
          sx={{ display: "relative", justifyContent: "right" }}
        >
          {success && <Alert color="success">{success}</Alert>}
          <IconButton aria-label="add to favorites" onClick={handleSave}>
            <Favorite />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
