import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useRouter } from 'next/router'
import { useState } from 'react';
import 'tailwindcss/tailwind.css'
import { GET_USER } from '../redux/actionTypes/user';
import { itemData } from '../utils';
import { Box } from '@mui/material';
import Input from '@mui/material/Input';
import { useDispatch } from 'react-redux'

export default function Login() {
  const [validateName, setValidateName] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [stateButton, setStateButton] = useState<boolean>(true);
  const [user, setUser] = useState({
    name: '',
    password: '',
    image: 'https://i.pinimg.com/736x/3c/44/5e/3c445e616be109b256a1568d6a6ce69b.jpg',
  });

  const dispatch = useDispatch();
 
  const router = useRouter();
  
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regexName = /^.{4,}$/; 
    const userName = regexName.test(value);
    
    if (userName) {
      setUser((prevUser) => ({
        ...prevUser,
        name: value,
      }));
      setValidateName(true);
    } else {
      console.error('Invalid UserName');
    }
    updateButtonState();
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // const regexPassword = /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    const regexPassword = /^.{6,}$/;
    const userPassword = regexPassword.test(value);
    if (userPassword) {
      setUser((prevUser) => ({
        ...prevUser,
        password: value,
      }));
      setValidatePassword(true);
    } else {
      console.error('Invalid UserPassword');
    }
    updateButtonState();
  }

  const updateButtonState = () => {
   if (validateName && validatePassword) {
    setStateButton(false);
   }
  }
  
  const buttonSubmit = () => {
    event?.preventDefault();
    if (user.name && user.password) {
      dispatch({
        type: GET_USER,
        payload: user,
      });
    }
    router.push('/album')
  }

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
  <div className="flex justify-around items-center h-screen bg-orange-50">
     <ImageList
      sx={{ width: '50vw', height: '80vh' }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item, index) => (
        <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Box component="form"
      sx={{ width: '30vw', height: '80vh', justifyContent: 'center'}}
      noValidate
      autoComplete="off" className="flex flex-col">
      <Input id="component-simple" onChange={handleChangeName} placeholder="Digite seu User" className="mb-5" />
      <Input id="component-simple"  type="password" onChange={handleChangePassword} placeholder="Digite seu Password" />
      <button
        type="submit"
        className={`bg-yellow-900 hover:bg-yellow-800 mt-5 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          stateButton ? 'disabled:bg-gray-300 cursor-not-allowed' : ''
        }`}
        disabled={stateButton}
        onClick={buttonSubmit}
      >
        Entrar
      </button>
    </Box>
  </div>
  );
};
