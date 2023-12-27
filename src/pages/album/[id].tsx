import React, { useEffect, useState, useCallback } from 'react';
import Header from "@/components/Header"
import { useRouter } from 'next/router';
import { getMusics } from '../../utils/fetchAPI';
import { Typography } from '@mui/material';
import { Music } from '../../interfaces';
import CardMusic from '@/components/CardMusic';
import {BoxAlbum, BoxAlbumContainer, BoxConatiner, AvatarAlbum, TypographyAlbum, TypographyCopyright } from '../../styles/Album';

const Album: React.FC = () => {
  const router = useRouter();
  const [musics, setMusics] = useState<Music[]>([]);

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
    <BoxConatiner>
      <Header />
      <main>
        { musics && musics.length > 0 && (
          <BoxAlbum >
            <BoxAlbumContainer>
              <AvatarAlbum
                src={ musics[0].artworkUrl100 }
                alt={ musics[0].collectionName }
              />
              <TypographyAlbum
                variant="h4"
                component="caption"
                gutterBottom
              >
              { musics[0]?.collectionName }
              </TypographyAlbum>
              <Typography variant="h6" component="h1" gutterBottom>
                Artista { musics[0]?.artistName }
              </Typography>
              <TypographyCopyright
                variant="caption"
                component="h1"
                gutterBottom
              >
                { musics[0]?.copyright }
              </TypographyCopyright>
            </BoxAlbumContainer>
            <CardMusic musics={musics}/>
          </BoxAlbum>
        )}
      </main>
    </BoxConatiner>
  );
};
export default Album;
