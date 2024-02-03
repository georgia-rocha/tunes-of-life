import * as React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import Menu from './Menu';
import { GET_SEARCH } from '@/redux/actionTypes/search';
import { useDispatch } from 'react-redux';
import { allFetchAPI } from '../utils/fetchAPI';
import { AppBarHeader, InputSearch, AvatarHeader, BoxContainer, TypographyName, TittleHeader } from '../styles/Header';
import { Box } from '@mui/material';
import { UserType } from '@/interfaces';
import { useLocalStorage } from 'usehooks-ts'

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState({ term: '', result: [] });
  const userFromState = useSelector((rootReducer: any) => rootReducer.userReducer);
  const [user, setUser] = useLocalStorage<UserType>('user', { 
    name: '',
    password: '',
    image: '' })

  const dispatch = useDispatch();

  const router = useRouter();

  const getUser = () => {
    if (userFromState){
      setUser(userFromState);
    }
    setUser(user);
  };
 
  useEffect(() => {
    getUser();
  }, [user?.name]);

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
