import React, { useState, useEffect } from 'react';
import { Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useDispatch } from 'react-redux';
import { GET_FAVORITES } from '@/redux/actionTypes/favorites';
import { useSelector } from 'react-redux';
import { CardMusicProps, Music } from '../interfaces';
import { useRouter } from 'next/router';
import { ListContainer, BoxContainer, Pause, Play, CheckboxCard,ListItemCard } from '../styles/CardMusic';

const CardMusic: React.FC<CardMusicProps> = ({ musics }) => {

  const [isPlayingIndex, setIsPlayingIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(new Audio(''));
  const [checkedState, setCheckedState] = useState<boolean[]>(musics ? new Array(musics.length).fill(false) : []);
  const selectedFavorites: Music[] = useSelector((rootReducer: any) => rootReducer.favoritesReducer.data);
  
  const dispatch = useDispatch();

  const router = useRouter();
  const currentPath = router.pathname;

  const handleChecked = (checkedId: number) => {
    return selectedFavorites.some((favorite: Music) => favorite.trackId === checkedId);
  };

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
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      if (audio) {
        audio.pause();
        setIsPlayingIndex(null);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, audio]);

  return (
    <ListContainer>
      {musics && musics.map((music, index) => (
        <ListItemCard
          key={music.trackId}
          currentPath={currentPath}
          index={index}
        >
          <BoxContainer>
            <IconButton
              aria-label="play/pause"
              onClick={() => handlePlayPauseClick(index)}
            >
              {isPlayingIndex === index ? (
                <Pause />
              ) : (
                <Play />
              )}
            </IconButton>
            <CheckboxCard
              icon={<StarOutlineIcon />}
              checkedIcon={<StarIcon />}
              checked={handleChecked(music.trackId)}
              onChange={() => handleCheckboxChange(index)}
            />
            <Typography
              variant="button"
              component="div"
            >
              {music.trackCensoredName}
            </Typography>
          </BoxContainer>
        </ListItemCard>
      ))}
    </ListContainer>
  );
};

export default CardMusic;
