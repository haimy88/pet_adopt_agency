import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePetContext } from "../contexts/PetContext";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../hooks/windowSize";

export default function QuickSearch() {
  const { quickSearchPets } = usePetContext();

  const navigate = useNavigate();

  const windowSize = useWindowSize();

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      quickSearchPets(e.target.value);
      navigate("/search");
    }
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    // border: "1px solid black",
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const buttonStyleSmallWindow = { backgroundColor: "#a24ba9db", ml: 2 };

  const buttonStyle = { ml: 4 };

  const spacing = windowSize[1] < 950 ? 0 : 4;

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(spacing)})`,
      transition: theme.transitions.create("width"),
      width: "45vw",
      border: "1px solid #212121",
      borderRadius: "5px",
      [theme.breakpoints.up("sm")]: {
        width: "55vw",
        "&:focus": {
          width: "60vw",
        },
      },
    },
  }));

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <Search>
        {windowSize[1] > 950 && (
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        )}
        <StyledInputBase
          placeholder="Quick Search.."
          inputProps={{ "aria-label": "search" }}
          onKeyDown={handleKeyDown}
        />
      </Search>
      {windowSize[1] < 950 && (
        <Button
          variant="contained"
          size="small"
          sx={windowSize[1] < 450 ? buttonStyleSmallWindow : buttonStyle}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Button>
      )}
    </Box>
  );
}
