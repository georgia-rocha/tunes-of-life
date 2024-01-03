import { Avatar, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

export const BoxFavorite = styled(Box)<{ component?: React.ElementType }>({
  background: '#eceff1',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const AvatarFavorite = styled(Avatar)<{ component?: React.ElementType }>({
  borderRadius: '50%',
  height: '30rem',
  marginTop: '1rem',
  width: '30rem',
});

export const BoxContainer = styled(Box)<{ component?: React.ElementType }>({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '1rem',
});