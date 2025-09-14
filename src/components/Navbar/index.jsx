import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // Alterado: Cor de fundo da barra de busca para cinza claro
  backgroundColor: '#f0f0f0',
  "&:hover": {
    // Cor de fundo ao passar o mouse, para um cinza um pouco mais escuro
    backgroundColor: '#e0e0e0',
  },
  marginLeft: 0,
  width: "100%",
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
  // Alterado: Cor do ícone para cinza escuro para se destacar no fundo claro
  color: '#333',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // Alterado: Cor do texto digitado para cinza escuro
  color: '#333',
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({ pokemonFilter, hideSearch }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "2em" }}>
      <AppBar position="static" sx={{ backgroundColor: "#a8009cfa" }}>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
            <Box component="img" src="/assets/pokemon-logo.png" height="3em" sx={{ cursor: "pointer" }} onClick={() => navigate("/")} />
            {!hideSearch && (
              <Search onChange={(e) => pokemonFilter(e.target.value)}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Pesquisando..." inputProps={{ "aria-label": "search" }} />
              </Search>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}