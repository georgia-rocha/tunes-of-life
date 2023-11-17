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
