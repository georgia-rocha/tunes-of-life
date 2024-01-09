import * as React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Menu from './Menu';
import { GET_SEARCH } from '@/redux/actionTypes/search';
import { useDispatch } from 'react-redux';
import { allFetchAPI } from '../utils/fetchAPI';
import { AppBarHeader, TittleHeader, InputSearch, AvatarHeader, BoxContainer, TypographyName } from '../styles/Header';
import { Box } from '@mui/material';
import { UserType } from '@/interfaces';

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState({ term: '', result: [] });
  const userFromState = useSelector((rootReducer: any) => rootReducer.userReducer);
  const userFromLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;

  const [user, setUser] = useState<UserType>();
  
  const dispatch = useDispatch();

  const router = useRouter();

  const getUser = () => {
    if (userFromState){
      setUser(userFromState);
    }
    setUser(userFromLocalStorage);
  };
 
  useEffect(() => {
    getUser();
  }, [userFromLocalStorage, userFromState]);

  const searchTerm = async (event: any) => {
    const { value } = event.target;

    try {
      const data = await allFetchAPI(value);
      const obj = {
        term: value,
        result: data,
      };
      setSearch(obj);
      dispatch({
        type: GET_SEARCH,
        payload: obj,
      });
    } catch (error) {
      console.error(error);
    };
  };

  const searchAlbuns = () => {
    if (searchOpen) {
      router.push('/search')
      setSearchOpen(!searchOpen);
    };
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      searchAlbuns();
    }
  };

  return (
    <AppBarHeader>
      <Toolbar>
        <TittleHeader
          variant="h5"
          onClick={() => router.push('/search')}
        >
          Tunes of Life
        </TittleHeader>
        { searchOpen ? (
          <Box>
            <InputSearch
              placeholder="Pesquisar..."
              onChange={ searchTerm }
              onKeyDown={ handleKeyDown }
            />
            <IconButton
              color="inherit"
              onClick={ searchAlbuns }
            >
              <SearchIcon />
            </IconButton>
          </Box>
        ) : (
          <IconButton
            color="inherit"
            onClick={ () => setSearchOpen(!searchOpen) }
          >
            <SearchIcon />
          </IconButton>
        )}
        <Box onClick={() => router.push('/favorites')}>
          <StarIcon />
        </Box>
        { user && (
          <BoxContainer
            onClick={() => setMenu(true)}
          >
            <TypographyName variant="body1">
              { user.name }
            </TypographyName>
            <AvatarHeader
              src={ user.image }
              alt="Perfil"
            />
          </BoxContainer>
        )}
        { menu ? <Menu open={menu} onClose={() => setMenu(false)} /> : null }
      </Toolbar>
    </AppBarHeader>
  );
};

export default Header;
