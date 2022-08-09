import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Alert, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";

export default function ActionAreaCard(props) {
  const { pet } = props;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [details, setDetails] = useState();
  const [isLoading, setLoading] = useState(true);
  const { getOwnershipDetails, declareReturnPet } = useUserContext();

  const navigate = useNavigate();

  useMemo(async () => {
    const data = await getOwnershipDetails(pet._id);
    setDetails(data.data[0]);
    setLoading(false);
  }, []);

  const handleClick = () => {
    localStorage.setItem("activeCard", JSON.stringify(pet));
    navigate("/petpage");
  };

  const handleReturnPet = async () => {
    try {
      const response = await declareReturnPet(details);
      if (response.error) {
        throw new Error(response.error);
      }
      setSuccess(true);
    } catch (err) {
      setError("Request failed");
    }
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 300, margin: 0 }} className="card_action">
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className="card_image"
            component="img"
            width="auto"
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
            <Typography
              className="card_start_date"
              gutterBottom
              variant="h6"
              component="div"
            >
              Start Date: {details.startDate}
            </Typography>
            {details.endDate && (
              <Typography
                className="card_end_date"
                gutterBottom
                variant="h6"
                component="div"
              >
                End Date: {details.endDate}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions
          disableSpacing
          sx={{ display: "relative", justifyContent: "right" }}
        >
          {success && (
            <Alert color="success">
              Thank you for spending time with this Furiend! Please return the
              pet to our local store
            </Alert>
          )}
          {details.status === "Approved" && (
            <Button onClick={handleReturnPet}> Return Pet </Button>
          )}
          {details.status === "Return Pending" && (
            <Typography gutterBottom variant="h6" component="div">
              {details.status}
            </Typography>
          )}
          {error && <Alert color="warning">{error}</Alert>}
        </CardActions>
      </Card>
    </>
  );
}
