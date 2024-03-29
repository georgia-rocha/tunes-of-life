export  interface SrcSetType {
  src: string;
  srcSet: string;
};

export interface MenuProps {
  open: boolean;
  onClose: () => void;
};

export interface SearchProps {
  data: {
    term: string,
    result: []
  }
};

export interface Music {
  id: number;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackId: number;
  trackCensoredName: string;
  copyright: string;
}

export interface CardMusicProps {
  musics: Music[],
};

export interface ListItemCardProps {
  currentPath: string;
  index: number;
}

export interface UserType {
  name: string;
  password: string;
  image: string;
}