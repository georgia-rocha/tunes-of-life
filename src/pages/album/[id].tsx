import React, { useEffect, useState, useCallback } from 'react';
import Header from "@/components/Header"
import { useRouter } from 'next/router';
import { getMusics } from '../../utils/fetchAPI';
import { Typography, Box, Avatar } from '@mui/material';
import { Music } from '../../interfaces';
import CardMusic from '@/components/CardMusic';

const Album: React.FC = () => {
  const router = useRouter();
  const [musics, setMusics] = useState<Music[] | undefined>(undefined);

  const getMusicsApi = useCallback(async () => {
    try {
      const { id } = router.query as { id: string };
      const musicData = await getMusics(id);
      setMusics(musicData.results);
    } catch (error) {
      console.error('Erro ao obter músicas:', error);
    };
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      await getMusicsApi();
    };
    fetchData();
  }, [getMusicsApi]);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', background: '#eceff1', height:'100vh'}}>
      <Header />
      <main>
        { musics && (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' , alignItems: 'center', width: '30rem'}}>
              <Avatar
                src={ musics[0].artworkUrl100 }
                alt={ musics[0].collectionName }
                sx={{width: '20rem', height: '20rem'}}
              />
              <Typography
                variant="h4"
                component="caption"
                gutterBottom
                sx={{marginTop: '2rem'}}
              >
              { musics[0]?.collectionName }
              </Typography>
              <Typography variant="h6" component="h1" gutterBottom>
                Artista { musics[0]?.artistName }
              </Typography>
              <Typography variant="caption" component="h1" gutterBottom sx={{textAlign: 'center'}}>{ musics[0]?.copyright }</Typography>
            </Box>
            <CardMusic musics={musics}/>
          </Box>
        )}
      </main>
    </Box>
  );
};
export default Album;
