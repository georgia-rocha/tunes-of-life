import React, { useEffect, useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useRouter } from 'next/router';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { GET_USER } from '../redux/actionTypes/user';
import { itemData } from '../utils';
import Input from '@mui/material/Input';
import { useDispatch } from 'react-redux';
import { SrcSetType } from '../interfaces';
import '../app/globals.css';
import { BoxForm, BoxImage, LoginContainer, Tittle } from '../styles/Login';
import { GET_SEARCH } from '@/redux/actionTypes/search';
import { allFetchAPI } from '../utils/fetchAPI';

const Login: React.FC = () => {
  const [validateName, setValidateName] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [stateButton, setStateButton] = useState<boolean>(true);
  const [search, setSearch] = useState({ term: '', result: [] });
  const [user, setUser] = useState({
    name: '',
    password: '',
    image: 'https://i.pinimg.com/736x/3c/44/5e/3c445e616be109b256a1568d6a6ce69b.jpg',
  });

  const dispatch = useDispatch();

  const router = useRouter();

  const imageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      const scrollContainer = imageListRef.current;

      if (scrollContainer) {
        const scrollAmount = 1;
        scrollContainer.scrollTop += scrollAmount;
      }
    };
    const scrollInterval = setInterval(scrollToBottom, 100);

    return () => clearInterval(scrollInterval);
  }, []);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const regexName = /^.{3,}$/;
    const userName = regexName.test(value);

    if (userName) {
      setUser((prevUser) => ({
        ...prevUser,
        name: value,
      }));
      setValidateName(userName);
    } else {
      console.error('Invalid UserName');
      setValidateName(false);
    };
    updateButtonState();
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    // const regexPassword = /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    const regexPassword = /^.{5,}$/;
    const userPassword = regexPassword.test(value);
    if (userPassword) {
      setUser((prevUser) => ({
        ...prevUser,
        password: value,
      }));
      setValidatePassword(userPassword);
    } else {
      console.error('Invalid UserPassword');
      setValidatePassword(false);
    };
    updateButtonState();
  };

  const updateButtonState = (): void => {
    if (validateName && validatePassword) {      
      setStateButton(false);
    } else {
      setStateButton(true);
    }
  };

  const handleLetterSearch = async () => {
    if (!search.result.length) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const indexLetter = Math.floor(Math.random() * alphabet.length);
      const data = await allFetchAPI(alphabet.charAt(indexLetter));
      const obj = {
        term: alphabet.charAt(indexLetter),
        result: data,
      };
      dispatch({
        type: GET_SEARCH,
        payload: obj,
      });
      const savedData = {
        data: {
          term: obj.term,
          result: obj.result,
        }
      };
      localStorage.setItem('search', JSON.stringify(savedData));
    };
  };

  const buttonSubmit = (): void => {
    event?.preventDefault();
    if (user.name && user.password) {
      dispatch({
        type: GET_USER,
        payload: user,
      });
      localStorage.setItem('user', JSON.stringify(user));
    };
    handleLetterSearch();
    router.push('/search');
  };

  const srcset = (image: string, size: number, rows = 1, cols = 1): SrcSetType => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  useEffect(() => {
    updateButtonState();
  }, [validateName, validatePassword]);
  
  return (
    <LoginContainer>
      <BoxImage
        ref={imageListRef}
      >
        <ImageList variant="quilted" cols={4} rowHeight={121}>
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
      </BoxImage>
      <BoxForm
        component="form"
      >
        <Tittle
          variant="h5"
          gutterBottom
        >
          Tunes of Life
        </Tittle>
        <Input
          onChange={handleChangeName}
          placeholder="Digite seu User"
          className="mb-5"
        />
        <Input
          type="password"
          onChange={handleChangePassword}
          placeholder="Digite seu Password"
        />
        <button
          type="submit"
          className={`button-login ${stateButton ? 'button-disabled' : ''}`}
          disabled={stateButton}
          onClick={buttonSubmit}
        >
          Entrar
        </button>
      </BoxForm>
    </LoginContainer>
  );
};
export default Login;