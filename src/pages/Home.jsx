import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Material-UI
import {
  Box,
  Container,
  Grid,
} from "@mui/material";
import { List, Apps } from "@mui/icons-material";

// Components
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Skeletons } from "../components/Skeletons";
import Footer from "../footer.js"; // O componente Footer

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 200; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.toLowerCase().includes(name.toLowerCase())) {
        filteredPokemons.push(pokemons[i]);
      }
    }
    setPokemons(filteredPokemons);
  };

  const pokemonPickHandler = (pokemonData) => {
    navigate(`/detalhes/${pokemonData.id}`);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <Box>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 15, // Adicionado uma margem inferior para o espaçamento do rodapé
        }}
      >
        <Box display="flex" justifyContent="flex-end" sx={{ marginY: 2 }}>
          <Box
            onClick={toggleView}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {isGridView ? <List /> : <Apps />}
          </Box>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            display: 'flex',
            flexDirection: isGridView ? 'row' : 'column',
            justifyContent: 'center',
            alignItems: isGridView ? 'stretch' : 'stretch',
          }}
        >
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid
                item
                xs={12}
                sm={isGridView ? 6 : 12}
                md={isGridView ? 4 : 12}
                lg={isGridView ? 2 : 12}
                key={key}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  minWidth: isGridView ? 0 : '300px',
                }}
              >
                <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                  <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} id={pokemon.data.id} />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};