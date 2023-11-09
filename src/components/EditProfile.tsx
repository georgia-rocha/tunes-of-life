import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { GET_USER } from '../redux/actionTypes/user';

export default function Modal({
  open,
  onClose,
}) {
  const user = useSelector((rootReducer: any) => rootReducer.userReducer);

  const dispatch = useDispatch();
  const router = useRouter();

  const logout = (): void => {
    if (user) {
      dispatch({
        type: GET_USER,
        payload: {
          name: '',
          password: '',
        },
      });
    }
    router.push('/')
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Link href="/profile">Perfil</Link>
        <a href="https://github.com/georgia-rocha">Saiba Mais</a>
        <Button onClick={logout}>Sair</Button>
      </DialogContent>
    </Dialog>
  )
}