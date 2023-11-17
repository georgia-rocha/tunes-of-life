import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/Header';
import { Avatar, Box, Container, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { SearchProps } from '../../interfaces';

export default function Search() {
  const search: SearchProps = useSelector((rootReducer: any) => rootReducer.searchReducer);
  
  useEffect(() => {
    console.log(search, 'dataaaaa');
  }, [search]);
  
  const data = search.data.result;

  return (
    <Box>
      <Header />
      <Container maxWidth="md" style={{ marginTop: '0.5rem' }}>
        {search && data.length > 0 ? (
          <List>
            <Typography variant="button" gutterBottom>
              {`Resultado de álbuns de:  ${search.data.term}`}
            </Typography>
            {data.map((term: any, index: number) => (
              <ListItem key={index}  sx={{ '&:hover': { backgroundColor: '#efded4' } }}>
                <ListItemAvatar>
                  <Avatar src={term.artworkUrl100} alt={term.collectionName} sx={{ width: 70, height: 70 }}/>
                </ListItemAvatar>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                  <Typography variant="caption" gutterBottom>{term.wrapperType}</Typography>
                  <Typography variant="button" gutterBottom>{term.trackName}</Typography>
                  <Typography variant="caption" gutterBottom>{term.artistName}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">
            Nenhum álbum foi encontrado
          </Typography>
        )}
      </Container>
    </Box>
  );
};
