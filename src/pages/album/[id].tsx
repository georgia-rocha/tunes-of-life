import React, { useEffect, useState, useCallback } from 'react';
import Header from "@/components/Header"
import { useRouter } from 'next/router';
import { getMusics } from '../../utils/fetchAPI';
import { Typography, Box, IconButton, Avatar, ListItem, List } from '@mui/material';
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
  const [isFavoritesIndex, setIsFavoritesIndex] = useState<number | null>(null);
  const [isPlayingIndex, setIsPlayingIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(new Audio(''));
  const [selectedFavorites, setSelectedFavorites] = useState<Music[]>([]);
  const [checkedState, setCheckedState] = useState<boolean[]>(musics ? new Array(musics.length).fill(false) : []);

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
      console.log(musics);
    };
    fetchData();
  }, [getMusicsApi]);

 
  const handleCheckboxChange = (index: number) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedState(newCheckedState);

    const isAlreadyFavorited = selectedFavorites.some((music) => music.trackId === musics[index].trackId);

    if (isAlreadyFavorited) {
      const updatedFavorites = selectedFavorites.filter((music) => music.trackId !== musics[index].trackId);
      setSelectedFavorites(updatedFavorites);
    } else {
      setSelectedFavorites((prevFavorites) => [...prevFavorites, musics[index]]);
    };
  };

  const handlePlayPauseClick = (index: number) => {
    if (audio && musics) {
      if (isPlayingIndex === index) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
          setIsPlayingIndex(null);
        };
      } else {
        const newAudio = new Audio(musics[index].previewUrl || '');
        newAudio.play();
        if (audio) {
          audio.pause();
          setIsPlayingIndex(null);
        };
        setAudio(newAudio);
        setIsPlayingIndex(index);
      };
    };
  };

  return (
    <div className="flex flex-col">
      <Header />
      <main>
        { musics && (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
              <Avatar
                src={ musics[0].artworkUrl100 }
                alt={ musics[0].collectionName }
                sx={{width: '30rem', height: '30rem'}}
              />
              <Typography
                variant="h3"
                component="caption"
                gutterBottom
                sx={{marginTop: '2rem'}}
              >
              { musics[0]?.collectionName }
              </Typography>
              <Typography variant="h6" component="h1" gutterBottom>
                Artista { musics[0]?.artistName }
              </Typography>
              <Typography variant="h6" component="h1" gutterBottom>{ musics[0]?.copyright }</Typography>
            </Box>
          {/*   { musics && ()} */}
            <List sx={{width: '30%'}}>
              { musics.map((music, index) => (
                <ListItem key={music.trackId} style={{ display: index === 0 ? 'none' : 'block' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', '&:hover': { backgroundColor: '#bcaaa4'}}}>
                    <IconButton aria-label="play/pause" onClick={() => handlePlayPauseClick(index)}>
                      { isPlayingIndex === index ? (
                        <PauseIcon sx={{ height: 38, width: 38 }} />
                      ) : (
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                      )}
                    </IconButton>
                    <Checkbox
                      icon={<StarOutlineIcon />}
                      checkedIcon={<StarIcon />}
                      checked={checkedState[index]}
                      onChange={ () => handleCheckboxChange(index) }
                      sx={{
                        '&.Mui-checked': {
                          color: 'rgba(0, 0, 0, 0.54)',
                        },
                      }}
                    />
                    <Typography variant="h5" component="div">{music.trackCensoredName}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </main>
    </div>
  );
};
export default Album;
