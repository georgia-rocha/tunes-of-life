import { Avatar, Box, Container, List, ListItem, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const BoxSearch = styled(Box)<{ component?: React.ElementType }>({
  background: '#eceff1',
  height: '100vh',
});

export const ContainerSearch = styled(Container)<{ component?: React.ElementType }>({
  marginTop: '0.5rem',
  width: '100%'
});

export const ListSearch = styled(List)<{ component?: React.ElementType }>({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 2,
  height: '88vh',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    background: 'none',
    width: '0.5rem',
  }
});

export const ListItemSearch = styled(ListItem)<{ component?: React.ElementType }>({
  alignItems: 'center',
  borderRadius: 2,
  height: '5rem',
  '&:hover': { 
    backgroundColor: '#A9A9A9',
    cursor: 'pointer'
  },
});

export const AvatarSearch = styled(Avatar)<{ component?: React.ElementType }>({
  height: 55,
  margin: 1,
  width: 55
});

export const BoxList = styled(Box)<{ component?: React.ElementType }>({
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  justifyContent: 'space-around',
  marginLeft: '1rem',
});

export const TypographyList = styled(Typography)<{ component?: React.ElementType }>({
  padding: '1rem',
  textAlign: 'center',
  width: '80vw',
});
