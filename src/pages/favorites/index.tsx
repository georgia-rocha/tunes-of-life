import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Music } from '../../interfaces';
import CardMusic from '@/components/CardMusic';
import Header from '@/components/Header';
import { fractalFavoritePage } from '../../utils';
import { BoxFavorite, AvatarFavorite, BoxContainer } from '../../styles/Favorites';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Music[]>([]);
  const favoritesState: Music[] = useSelector((rootReducer: any) => rootReducer.favoritesReducer.data);
  const favoritesLocalStorage = typeof window !== 'undefined' ?  JSON.parse(localStorage.getItem('favorites') || 'null') : null;

  const getFavorites = () => {
    if (favoritesState){
      setFavorites(favoritesState);      
    }    
    setFavorites(favoritesLocalStorage);
  };
 
  useEffect(() => {
    getFavorites();
  }, [favoritesLocalStorage, favoritesState]);
  
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
