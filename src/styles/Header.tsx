import { AppBar, Avatar, Box, InputBase, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const AppBarHeader = styled(AppBar)<{ component?: React.ElementType }>({
  background: '#1C1C1C',
  position: 'static',
});

export const TittleHeader = styled(Typography)<{ component?: React.ElementType }>({
  cursor: 'pointer',
  flexGrow: 1,
});

export const InputSearch = styled(InputBase)<{ component?: React.ElementType }>({
  color: 'white',
  marginRight: '0.5rem',
  '& input': {
    fontSize: '1rem'
  }
});

export const AvatarHeader = styled(Avatar)<{ component?: React.ElementType }>({
  borderRadius: '50%',
  height: '3.1rem',
  width: '3.1rem',
});

export const BoxContainer = styled(Box)<{ component?: React.ElementType }>({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  marginLeft: '0.5rem',
});

export const TypographyName = styled(Typography)<{ component?: React.ElementType }>({
  marginRight: '1.3rem'
});
