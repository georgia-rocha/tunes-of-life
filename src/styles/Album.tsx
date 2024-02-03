import { Avatar, Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const BoxConatiner = styled(Box)<{ component?: React.ElementType }>({
  background: '#eceff1',
  display: 'flex',
  flexDirection: 'column',
  height:'100vh',
});

export const BoxAlbum = styled(Box)<{ component?: React.ElementType }>({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '2rem',
});

export const BoxAlbumContainer = styled(Box)<{ component?: React.ElementType }>({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  width: '30rem',
  color: '#1C1C1C'
});

export const AvatarAlbum = styled(Avatar)<{ component?: React.ElementType }>({
  height: '20rem',
  width: '20rem',
});

export const TypographyAlbum = styled(Typography)<{ component?: React.ElementType }>({
  marginTop: '2rem',
  color: '#1C1C1C'
});

export const TypographyCopyright = styled(Typography)<{ component?: React.ElementType }>({
  textAlign: 'center',
  color: '#1C1C1C'
});