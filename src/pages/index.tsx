import { useRouter } from 'next/router'
import { useState } from 'react';
import Button from '@mui/material/Button';
import 'tailwindcss/tailwind.css'
import Image from 'next/image'

export default function Login() {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const [validateName, setValidateName] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [stateButton, setStateButton] = useState<boolean>(true);
 
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
  

  return (
  <div className="flex justify-around items-center">
    <Image
      src="/images/login.jpg"
      alt="img-tela-login"
      width={500}
      height={500} 
    />
    <form className="flex flex-col">
      <input type="text" placeholder="Digite seu Nome de Usuário"
        className="border rounded-md p-2 w-full text-gray-700 placeholder-gray-400"
        onChange={handleChangeName}
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        className="border rounded-md p-2 w-full text-gray-700 placeholder-gray-400"
        onChange={handleChangePassword}
      />
      <Button
        variant="contained"
        type="submit"
        disabled={stateButton}
        onClick={() => router.push('/album')}
      >
        Entrar
      </Button>
    </form>
  </div>
  )
}
