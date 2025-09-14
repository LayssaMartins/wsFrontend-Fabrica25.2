import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";

// Importa o arquivo CSS de estilos
import './PokemonCard.css';

export default function PokemonCard({ name, image, id }) {
    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 250, // Garante que o card não fique muito grande
                position: 'relative',
                // --- NOVO CÓDIGO PARA O FUNDO DO CARD ---
                backgroundImage: `url('${process.env.PUBLIC_URL}/assets/imagensdefundo.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'overlay',
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor de fundo para deixar o mato mais claro e o texto legível
                // --- FIM DO NOVO CÓDIGO ---
            }}
            className="pokemon-card-container"
        >
            <CardActionArea>
                <Box
                    className="card-image-frame"
                    sx={{
                        backgroundImage: `url('${process.env.PUBLIC_URL}/assets/card-frame.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                    />
                </Box>
                <CardContent className="card-footer-content" sx={{ backgroundColor: 'transparent' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                                color: '#333',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                noWrap: true,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: '#666', fontWeight: 'bold', fontSize: '1rem' }}
                        >
                            #{id.toString().padStart(3, '0')}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}