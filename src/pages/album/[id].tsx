import React, { useEffect, useState, useCallback } from 'react';
import Header from "@/components/Header"
import { useRouter } from 'next/router';
import { getMusics } from '../../utils/fetchAPI';
import { Typography, Box, IconButton } from '@mui/material';
import { Music } from '../../interfaces';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Album: React.FC = () => {
  const router = useRouter();
  const [musics, setMusics] = useState<Music[] | undefined>(undefined);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlayingIndex, setIsPlayingIndex] = useState<number | null>(null);

  const getMusicsApi = useCallback(async () => {
    try {
      const { id } = router.query as { id: string };
      const musicData = await getMusics(id);
      setMusics(musicData.results);
      console.log('musicsssssss', musicData.results);
    } catch (error) {
      console.error('Erro ao obter músicas:', error);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      await getMusicsApi();
      console.log(musics);

    };

    fetchData();
  }, [getMusicsApi]);

  const handleCheckboxChange = () => {
    setIsFavorited(!isFavorited);
  };

  const handlePlayPauseClick = (index: number) => {
    setIsPlayingIndex(index === isPlayingIndex ? null : index);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <main>
        {musics && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Álbum de {musics[0]?.artistName}
            </Typography>
            <h1>{musics[0]?.collectionName}</h1>
            <ul>
              {musics.slice(1).map((music, index) => (
                <li key={music.trackId}>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="play/pause" onClick={() => handlePlayPauseClick(index)}>
                      {isPlayingIndex === index ? (
                        <PauseIcon sx={{ height: 38, width: 38 }} />
                      ) : (
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                      )}
                    </IconButton>
                    <Checkbox
                      icon={<StarOutlineIcon />}
                      checkedIcon={<StarIcon />}
                      checked={isFavorited}
                      onChange={handleCheckboxChange}
                    />
                    <Typography variant="subtitle1" component="div">{music.trackCensoredName}</Typography>
                  </Box>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};
export default Album;
