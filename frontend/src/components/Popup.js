import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Pets from "@mui/icons-material/Pets";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Avatar style={avatarStyle}>
            <Pets />
          </Avatar>
          <Typography
            sx={{ ml: 2 }}
            style={{ flexGrow: "1" }}
            variant="h6"
            component="div"
          >
            {title}
          </Typography>

          <Button
            color="warning"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers maxWidth="md">
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
