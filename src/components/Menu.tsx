import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { GET_USER } from '../redux/actionTypes/user';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import { MenuProps } from '../interfaces';

export default function Menu({
  open,
  onClose,
}: MenuProps) {

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
    <Drawer anchor="right" open={open}
    onClose={onClose}
    variant="temporary">
        <List>
          <Link href="/profile">
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Editar Perfil" />
            </ListItem>
          </Link>
          <a href="https://github.com/georgia-rocha">
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="Saiba +" />
            </ListItem>
          </a>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
  );
};
