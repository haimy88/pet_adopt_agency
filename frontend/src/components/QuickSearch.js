import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
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
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    // [theme.breakpoints.down("lg")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto",
    // },
    // [theme.breakpoints.down("md")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto",
    // },
    // [theme.breakpoints.down("md")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto",
    // },
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

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      border: "1px solid #212121",
      borderRadius: "5px",
      [theme.breakpoints.up("sm")]: {
        width: "80ch",
        "&:focus": {
          width: "85ch",
        },
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Quick Search.."
        inputProps={{ "aria-label": "search" }}
        onKeyDown={handleKeyDown}
      />
    </Search>
  );
}
