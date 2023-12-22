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
      <Box sx={ {display: 'flex', justifyContent: 'space-around', marginTop: '3rem' } }>
        <Avatar src={ fractalFavoritePage } alt='fractal' sx={{width: '32rem', height: '32rem' } }/>
        { favorites.length === 0 ? (
          <Typography
          variant="h4"
          component="caption"
          gutterBottom
          sx={ { marginTop: '2rem' } }
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