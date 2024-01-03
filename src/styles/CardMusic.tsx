import { Box, List, ListItem } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { ListItemCardProps } from '../interfaces';
import { styled } from '@mui/material/styles';

export const ListContainer = styled(List)<{ component?: React.ElementType }>({
  width: '40%',
  height: '80vh',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.5rem',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#eceff1',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
  },
  '&:hover': {
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4a4a4a',
    },
  },
});

export const BoxContainer = styled(Box)<{ component?: React.ElementType }>({
  display: 'flex', alignItems: 'center', '&:hover': { backgroundColor: '#A9A9A9' } 
});

export const Pause = styled(PauseIcon)<{ component?: React.ElementType }>({
  height: 38, width: 38
});

export const Play = styled(PlayArrowIcon)<{ component?: React.ElementType }>({
  height: 38, width: 38
});

export const CheckboxCard = styled(Checkbox)<{ component?: React.ElementType }>({
  '&.Mui-checked': {
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

export const ListItemCard = styled(ListItem)<ListItemCardProps>(({ currentPath, index }) => ({
  display: currentPath.includes("/album") && index === 0 ? 'none' : 'block',
  padding: 0,
  cursor: 'pointer',
}));

