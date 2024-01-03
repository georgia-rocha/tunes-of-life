import { AppBar, Avatar, Box, InputBase, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const LoginContainer = styled(Box)<{ component?: React.ElementType }>({
  alignItems: 'center',
  background: '#eceff1',
  display: 'flex',
  justifyContent: 'space-around',
  height: '100vh',
});

export const BoxImage = styled(Box)<{ component?: React.ElementType }>({
  height: '80vh',
  overflow: 'hidden',
  scrollBehavior: 'smooth' ,
  width: '50vw',
});

export const BoxForm = styled(Box)<{ component?: React.ElementType }>({
  display: 'flex',
  flexDirection: 'column',
  height: '80vh',
  justifyContent: 'center',
  width: '30vw',
});

export const Tittle = styled(Typography)<{ component?: React.ElementType }>({
  alignItems: 'center',
  color: '#1C1C1C',
  display: 'flex',
  fontWeight: 'bold',
  justifyContent: 'center',
  marginBottom: '1.25rem',
  textAlign: 'center',
});