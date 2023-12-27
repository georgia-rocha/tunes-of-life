import { AppBar, Avatar, Box, DialogContent, IconButton, InputBase, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const IconButtonEdit = styled(IconButton)<{ component?: React.ElementType }>({
  position: 'absolute', top: 8, right: 8, zIndex: 1, 
});

export const DialogEdit = styled(DialogContent)<{ component?: React.ElementType }>({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.5rem',
  height: '80vh',
  '&::-webkit-scrollbar': {
    width: '0.5rem',
    background: 'none',
  }
});

export const Tittle = styled(Typography)<{ component?: React.ElementType }>({
  marginBottom: '0.5rem'
});

export const AvatarEdit = styled(Avatar)<{ component?: React.ElementType }>({
  width: '10rem', height: '10rem', borderRadius: '50%', marginBottom: '0.8rem'
});

export const TextFieldEdit = styled(TextField)<{ component?: React.ElementType }>({
  marginBottom: '2rem', maxHeight: '3rem'
});
