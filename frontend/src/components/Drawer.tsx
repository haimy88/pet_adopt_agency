import * as React from "react";
import { Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeRounded from "@mui/icons-material/HomeRounded";
import Pets from "@mui/icons-material/Pets";
import Person from "@mui/icons-material/Person";
import Dashboard from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";
import { useWindowSize } from "../hooks/windowSize";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const navLinksLoggedIn = [
//   <NavLink style={{ textDecoration: "none" }} to="/">
//     Home
//   </NavLink>,
//   <NavLink style={{ textDecoration: "none" }} to="/Profile">
//     Profile
//   </NavLink>,
//   <NavLink style={{ textDecoration: "none" }} to="/MyPets">
//     MyPets
//   </NavLink>,
// ];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { currentUser, isAdmin, logout } = useAuthContext();
  const {
    home_html,
    search_html,
    petPage_html,
    dashboard_html,
    my_pets_html,
    profile_html,
  } = props;

  const navigate = useNavigate();

  const windowSize = useWindowSize();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <div className="app_bar_wrapper">
          <Toolbar>
            <div className="app_bar">
              <div className="app_bar_left_box">
                {currentUser && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  <p onClick={() => navigate("/")} className="welcome_banner">
                    {!currentUser && windowSize[1] > 600 && "Welcome to"}{" "}
                    FuRiendZone
                  </p>
                </Typography>
              </div>
              {!currentUser && windowSize[1] > 600 && (
                <div className="button-wrapper">
                  <Signup />
                  <Login />
                  <ForgotPassword />
                </div>
              )}
            </div>
            {currentUser && windowSize[1] > 950 && (
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, width: "50vw" }}
              >
                <div className="welcome_user">
                  Welcome back, {currentUser.firstName}!
                </div>
              </Typography>
            )}
            {currentUser && (
              <Button
                sx={{ mr: 3 }}
                onClick={() => {
                  handleDrawerClose();
                  logout();
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </div>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {currentUser &&
            !isAdmin &&
            ["Home", "Profile", "MyPets"].map((text, index) => (
              <ListItem component={Link} to={`/${text}`} button key={index}>
                <ListItemIcon>
                  {index === 0 && <HomeRounded />}
                  {index === 1 && <Person />}
                  {index === 2 && <Pets />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          {currentUser &&
            isAdmin &&
            ["Home", "Profile", "Dashboard"].map((text, index) => (
              <ListItem component={Link} to={`/${text}`} button key={index}>
                <ListItemIcon>
                  {index === 0 && <HomeRounded />}
                  {index === 1 && <Person />}
                  {index === 2 && <Dashboard />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          {["Search"].map((text, index) => (
            <ListItem component={Link} to={`/${text}`} button key={index}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main className="drawer_main" open={open}>
        <DrawerHeader />
        {home_html}
        {search_html}
        {petPage_html}
        {dashboard_html}
        {my_pets_html}
        {profile_html}
      </Main>
    </Box>
  );
}
