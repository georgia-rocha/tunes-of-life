import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Music } from '../../interfaces';
import CardMusic from '@/components/CardMusic';
import Header from '@/components/Header';
import { fractalFavoritePage } from '../../utils';
import { BoxFavorite, AvatarFavorite, BoxContainer } from '../../styles/Favorites';
import { useLocalStorage } from 'usehooks-ts'

const Favorites: React.FC = () => {
  const favoritesState: Music[] = useSelector((rootReducer: any) => rootReducer.favoritesReducer.data);
  const [favs, setFavs] = useLocalStorage<Music[]>('favorites', []);

  const getFavorites = () => {
    if (favoritesState){
      setFavs(favoritesState);      
    }    
    setFavs(favs);
  };
 
  useEffect(() => {
    getFavorites();
  }, [favs.length]);
  
  return (
    <BoxFavorite>
      <Header />
      <BoxContainer >
        <AvatarFavorite src={fractalFavoritePage} alt='fractal' />
        {favs.length === 0 ? (
          <Typography
            variant="h5"
            component="caption"
            gutterBottom
            sx={{ width: '40%' }}
          >
            Nenhuma música favorita encontrada
          </Typography>
        ) : <CardMusic musics={favs} />
        }
      </BoxContainer>
    </BoxFavorite>
  );
};

export default Favorites;
