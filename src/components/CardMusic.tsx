import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface CardMusicProps {
  previewUrl: string;
}

const CardMusic: React.FC<CardMusicProps> = ({ previewUrl }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleCheckboxChange = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div>
      <audio data-testid="audio-component" src={previewUrl} controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento <code>audio</code>
      </audio>
      <Checkbox
      icon={<StarOutlineIcon />}
      checkedIcon={<StarIcon />}
      checked={isFavorited}
      onChange={handleCheckboxChange}
    />
    </div>
  );
};

export default CardMusic;
