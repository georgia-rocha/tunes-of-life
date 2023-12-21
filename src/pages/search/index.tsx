import React from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/Header';
import { Avatar, Box, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { SearchProps } from '../../interfaces';
import { useRouter } from 'next/router';

const Search: React.FC = () => {
  const search: SearchProps = useSelector((rootReducer: any) => rootReducer.searchReducer);
  const router = useRouter();

  const data = search.data.result;

  return (
    <Box>
      <Header />
      <Container maxWidth={false} style={{ marginTop: '0.5rem', width: '100%' }}>
        {search && data.length > 0 ? (
          <Grid container >
            <Typography
              variant="h5"
              component="caption"
              gutterBottom
            >
              {`Resultado de álbuns de: ${search.data.term}`}
            </Typography>
            <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
              {data.map((term: any, index: number) => (
                <ListItem
                  key={index}
                  sx={{
                    alignItems: 'center',
                    borderRadius: 2,
                    height: '5rem',
                    '&:hover': { backgroundColor: '#bcaaa4', cursor: 'pointer'},
                  }}
                  onClick={() => router.push(`/album/${term.collectionId}`)}
                >
                  <ListItemAvatar>
                    <Avatar src={term.artworkUrl100} alt={term.collectionName} sx={{ width: 55, height: 55, margin: 1 }} />
                  </ListItemAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 1 }}>
                    <Typography variant="button">{term.collectionCensoredName}</Typography>
                    <Typography variant="caption">{term.artistName}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>
        ) : (
          <Typography variant="body1">Nenhum álbum foi encontrado</Typography>
        )}
      </Container>
    </Box>
  );
};
export default Search;
