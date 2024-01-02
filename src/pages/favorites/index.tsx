import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Music } from '../../interfaces';
import CardMusic from '@/components/CardMusic';
import Header from '@/components/Header';
import { fractalFavoritePage } from '../../utils';
import { BoxFavorite, AvatarFavorite, BoxContainer } from '../../styles/Favorites';

const Favorites: React.FC = () => {
  const favorites: Music[] = useSelector((rootReducer: any) => rootReducer.favoritesReducer.data);

  return (
    <BoxFavorite>
      <Header />
      <BoxContainer >
        <AvatarFavorite src={fractalFavoritePage} alt='fractal' />
        {favorites.length === 0 ? (
          <Typography
            variant="h5"
            component="caption"
            gutterBottom
            sx={{ width: '40%' }}
          >
            Nenhuma música favorita encontrada
          </Typography>
        ) : <CardMusic musics={favorites} />
        }
      </BoxContainer>
    </BoxFavorite>
  );
};

export default Favorites;
