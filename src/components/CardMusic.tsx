import React, { useState, useCallback } from 'react';
import { Typography, Box, IconButton, Avatar, ListItem, List } from '@mui/material';
import { Music } from '../../src/interfaces';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch } from 'react-redux';
import { GET_FAVORITES } from '@/redux/actionTypes/favorites';
import { useSelector } from 'react-redux';

interface CardMusicProps {
  musics: Music[] | undefined,
};

const CardMusic: React.FC<CardMusicProps> = ({ musics  }) => {

  const [isPlayingIndex, setIsPlayingIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(new Audio(''));
  
  const [checkedState, setCheckedState] = useState<boolean[]>(musics ? new Array(musics.length).fill(false) : []);
 
  const selectedFavorites = useSelector((rootReducer: any) => rootReducer.favoritesReducer.data);

  const dispatch = useDispatch();

  const handleChecked = (checkedId: number) => {
    console.log({checkedId});
    
    console.log({selectedFavorites});
    
    return selectedFavorites.some((favorite) => favorite.trackId === checkedId);
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedState(newCheckedState);

    const isAlreadyFavorited = selectedFavorites.some((music) => music.trackId === musics[index].trackId);

    if (isAlreadyFavorited) {
      const updatedFavorites = selectedFavorites.filter((music) => music.trackId !== musics[index].trackId);
           
      dispatch({
        type: GET_FAVORITES,
        payload: updatedFavorites,
      });
    } else {
      const updatedFavorites = [...selectedFavorites, musics[index]]
 
      dispatch({
        type: GET_FAVORITES,
        payload: updatedFavorites,
      });
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
    <List sx={{width: '30%'}}>
      { musics && musics.map((music, index) => (
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
              checked={handleChecked(music.trackId)}
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
  );
};

export default CardMusic;
