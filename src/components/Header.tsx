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
import { useSelector } from 'react-redux'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
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
              sx={{ marginRight: '8px', color: 'white'}}
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
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
            <img
              src={user.img}
              alt="Imagem de Perfil"
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
            <Typography variant="body1" sx={{ marginLeft: '8px' }}>
              {user.name}
            </Typography>
          </div>
        )}
      </Toolbar>
  </AppBar>
  )
}