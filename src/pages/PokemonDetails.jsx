import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    Chip, 
    Divider, 
    CircularProgress,
    Button
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from "../components/Navbar";
import { keyframes } from '@mui/material/styles'; // Importação da função keyframes

// Definição da animação
const pulseAura = keyframes`
  0% {
    box-shadow: 0 0 10px 5px rgba(160, 64, 160, 0.4);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(160, 64, 160, 0.8);
  }
  100% {
    box-shadow: 0 0 10px 5px rgba(160, 64, 160, 0.4);
  }
`;

export const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then((res) => {
                setPokemon(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados do Pokémon:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <CircularProgress />
                <Typography variant="h5" ml={2}>Carregando Pokémon...</Typography>
            </Box>
        );
    }

    if (!pokemon) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100vh', flexDirection: 'column' }}>
                <Typography variant="h4" color="error">Pokémon não encontrado!</Typography>
                <Button 
                    variant="contained" 
                    sx={{ mt: 3 }} 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => navigate('/')}
                >
                    Voltar para a Lista
                </Button>
            </Box>
        );
    }

    const getTypeColor = (type) => {
        switch (type) {
            case 'fire': return '#FF4500';
            case 'grass': return '#7CFC00';
            case 'water': return '#1E90FF';
            case 'bug': return '#ADFF2F';
            case 'normal': return '#A8A878';
            case 'poison': return '#A040A0';
            case 'electric': return '#FFD700';
            case 'ground': return '#DEB887';
            case 'fairy': return '#FFB6C1';
            case 'fighting': return '#C22E28';
            case 'psychic': return '#F95587';
            case 'rock': return '#B8A038';
            case 'ghost': return '#705898';
            case 'ice': return '#98D8D8';
            case 'dragon': return '#7038F8';
            case 'steel': return '#B8B8D0';
            case 'dark': return '#705848';
            default: return '#68A090';
        }
    };

    return (
        <>
            <Navbar hideSearch />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper 
                    elevation={6} 
                    sx={{ 
                        padding: { xs: 2, md: 4 }, 
                        borderRadius: '15px', 
                        animation: `${pulseAura} 2s infinite ease-in-out` // Aplicação da animação
                    }}
                >
                    <Button 
                        variant="outlined" 
                        startIcon={<ArrowBackIcon />} 
                        onClick={() => navigate('/')} 
                        sx={{ mb: 3 }}
                    >
                        Voltar para a Lista
                    </Button>

                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <img 
                            src={pokemon.sprites.front_default} 
                            alt={pokemon.name} 
                            style={{ 
                                width: 250,
                                height: 250,
                                filter: 'drop-shadow(3px 3px 5px rgba(0,0,0,0.3))' 
                            }} 
                        />
                        <Typography 
                            variant="h2" 
                            sx={{ textTransform: 'capitalize', mt: 1, fontWeight: 'bold', color: '#333' }}
                        >
                            {pokemon.name}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ mt: 0.5 }}>
                            ID: #{pokemon.id.toString().padStart(3, '0')}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box display="flex" flexDirection="column" gap={2} mb={3}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Tipo(s): 
                            {pokemon.types.map(typeInfo => (
                                <Chip 
                                    key={typeInfo.type.name} 
                                    label={typeInfo.type.name} 
                                    sx={{ 
                                        ml: 1, 
                                        backgroundColor: getTypeColor(typeInfo.type.name),
                                        color: 'white',
                                        textTransform: 'capitalize',
                                        fontWeight: 'bold'
                                    }} 
                                />
                            ))}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Peso: <Typography component="span" variant="h6" color="text.primary">{pokemon.weight / 10} kg</Typography>
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Experiência Base: <Typography component="span" variant="h6" color="text.primary">{pokemon.base_experience}</Typography>
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="h6" color="text.secondary">Variações</Typography>
                    </Divider>
                    <Box display="flex" justifyContent="space-around" flexWrap="wrap" gap={2} mb={3}>
                        {pokemon.sprites.front_female && 
                            <img src={pokemon.sprites.front_female} alt="female" style={{ width: 100, height: 100 }} />
                        }
                        {pokemon.sprites.front_shiny && 
                            <img src={pokemon.sprites.front_shiny} alt="shiny" style={{ width: 100, height: 100 }} />
                        }
                        {pokemon.sprites.front_shiny_female && 
                            <img src={pokemon.sprites.front_shiny_female} alt="shiny female" style={{ width: 100, height: 100 }} />
                        }
                        {!pokemon.sprites.front_female && !pokemon.sprites.front_shiny && !pokemon.sprites.front_shiny_female && 
                            <Typography variant="body2" color="text.secondary">Nenhuma variação extra.</Typography>
                        }
                    </Box>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="h6" color="text.secondary">Ataques</Typography>
                    </Divider>
                    <Box textAlign="center" marginTop="15px" display="flex" flexWrap="wrap" gap={1} justifyContent="center">
                        {pokemon.moves.slice(0, 15).map((moveData, key) => (
                            <Chip 
                                key={key} 
                                label={moveData.move.name} 
                                color="primary" 
                                variant="outlined" 
                                sx={{ textTransform: 'capitalize' }} 
                            />
                        ))}
                        {pokemon.moves.length > 15 && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, width: '100%' }}>
                                ...e {pokemon.moves.length - 15} mais ataques.
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Container>
        </>
    );
};