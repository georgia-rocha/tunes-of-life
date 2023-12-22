import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, Typography } from '@mui/material';
import { Music } from '../../interfaces';
import CardMusic from '@/components/CardMusic';
import Header from '@/components/Header';
import { fractalFavoritePage } from '../../utils';

const Favorites: React.FC = () => {
  const favorites: Music[] = useSelector((rootReducer: any) => rootReducer.favoritesReducer.data);

  return (
    <Box sx={ {display: 'flex', flexDirection: 'column', background: '#eceff1', height:'100vh' } }>
      <Header />
      <Box sx={ {display: 'flex', justifyContent: 'space-around', marginTop: '1rem', alignItems: 'center' } }>
        <Avatar src={ fractalFavoritePage } alt='fractal' sx={{width: '30rem', height: '30rem', borderRadius: '50%', marginTop: '1.5rem' } }/>
        { favorites.length === 0 ? (
          <Typography
            variant="h5"
            component="caption"
            gutterBottom
          >
            Nenhuma música favorita encontrada
          </Typography>
          ) : <CardMusic musics={ favorites } />
          }
        
      </Box>
    </Box>
  );
};

export default Favorites;