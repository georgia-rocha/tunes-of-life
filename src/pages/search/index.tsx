import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/Header';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import { SearchProps } from '../../interfaces';
import { useRouter } from 'next/router';

export default function Search() {
  const search: SearchProps = useSelector((rootReducer: any) => rootReducer.searchReducer);
  const router = useRouter();
  useEffect(() => {
    console.log(search, 'dataaaaa');
  }, [search]);
  
  const data = search.data.result;

  return (
    <Box>
      <Header />
      <Container maxWidth={false} style={{ marginTop: '0.5rem', width: '100%' }}>
        {search && data.length > 0 ? (
          <Grid container >
            <Typography variant="button" gutterBottom>
              {`Resultado de álbuns de: ${search.data.term}`}
            </Typography>
            <Grid container spacing={2}>
              {data.map((term: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2, height: '14rem', '&:hover': { backgroundColor: '#bcaaa4' } }}
                    onClick={() => router.push(`/album/${term.artistId}`)}
                  >
                    <Avatar src={term.artworkUrl100} alt={term.collectionName} sx={{ width: 75, height: 75, margin: 1 }} />
                    <Typography variant="caption" gutterBottom>
                      {term.artistName}
                    </Typography>
                    <Typography variant="button" gutterBottom sx={{ textAlign: 'center'}}>
                      {term.collectionCensoredName}
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      {term.primaryGenreName}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Nenhum álbum foi encontrado</Typography>
        )}
      </Container>
    </Box>
  );
};
