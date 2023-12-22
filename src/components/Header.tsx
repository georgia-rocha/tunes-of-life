import * as React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import { useSelector } from 'react-redux';
import Menu from './Menu';
import { GET_SEARCH } from '@/redux/actionTypes/search';
import { useDispatch } from 'react-redux';
import { allFetchAPI } from '../utils/fetchAPI';
import { Avatar } from '@mui/material';

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState({ term: '', result: [] });

  const user = useSelector((rootReducer: any) => rootReducer.userReducer);

  const dispatch = useDispatch();

  const router = useRouter();

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
    <AppBar position="static" sx={{ background: '#1C1C1C' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Tunes of Life
        </Typography>
        { searchOpen ? (
          <div>
            <InputBase
              placeholder="Pesquisar..."
              onChange={searchTerm}
              onKeyDown={handleKeyDown}
              sx={{
                marginRight: '0.5rem', color: 'white', '& input': {
                  fontSize: '1rem'
                }
              }}
            />
            <IconButton color="inherit" onClick={ searchAlbuns }>
              <SearchIcon />
            </IconButton>
          </div>
        ) : (
          <IconButton color="inherit" onClick={ () => setSearchOpen(!searchOpen) }>
            <SearchIcon />
          </IconButton>
        )}
        <Link href="/favorites">
          <IconButton color="inherit">
            <StarIcon />
          </IconButton>
        </Link>
        { user && (
          <div
            className='flex items-center ml-1 cursor-pointer'
            onClick={() => setMenu(true)}
          >
            <Typography variant="body1" sx={{ marginRight: '0.8rem' }}>
              { user.name }
            </Typography>
            <Avatar
              src={ user.image }
              alt="Perfil"
              sx={{ width: '3.1rem', height: '3.1rem', borderRadius: '50%' }}
            />
          </div>
        )}
        { menu ? <Menu open={menu} onClose={() => setMenu(false)} /> : null }
      </Toolbar>
    </AppBar>
  );
};

export default Header;
