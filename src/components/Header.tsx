import * as React from 'react';
import { useRouter } from 'next/router'
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
import { SetMealRounded } from '@mui/icons-material';
import Menu from './Menu';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menu, setMenu] = useState(false);

  const user = useSelector((rootReducer: any) => rootReducer.userReducer);  

  const handleSearchToggle = (): void => {
    setSearchOpen(!searchOpen);
  };

  const openMenu = (): void => {
    setMenu(true);
  };

  const closeMenu = (): void => {
    setMenu(false);
  };

  return (
    <AppBar position="static" sx={{ background: '#3e2723' }}>
    <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Tunes of Life
        </Typography>
        {searchOpen ? (
          <div>
            <InputBase
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: '0.5rem', color: 'white'}}
            />
            <IconButton color="inherit" onClick={handleSearchToggle}>
              <SearchIcon />
            </IconButton>
          </div>
        ) : (
          <IconButton color="inherit" onClick={handleSearchToggle}>
            <SearchIcon />
          </IconButton>
        )}
        <Link href="/favorites">
          <IconButton color="inherit">
            <StarIcon />
          </IconButton>
        </Link>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.2rem', cursor: 'pointer' }} onClick={openMenu}>
            <Typography variant="body1" sx={{ marginRight: '0.8rem' }}>
              {user.name}
            </Typography>
            <img
              src={user.image}
              alt="Perfil"
              style={{ width: '3.1rem', height: '3.1rem', borderRadius: '50%' }}
            />
          </div>
        )}
        { menu ? <Menu open={ menu } onClose={ closeMenu } /> : null}
      </Toolbar>
  </AppBar>
  );
};
