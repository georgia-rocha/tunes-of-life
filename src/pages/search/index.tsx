import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/Header';
import { Grid, ListItemAvatar, Typography } from '@mui/material';
import { SearchProps } from '../../interfaces';
import { useRouter } from 'next/router';
import { BoxSearch, ContainerSearch, ListSearch, ListItemSearch, AvatarSearch, BoxList, TypographyList } from '../../styles/Search';

const Search: React.FC = () => {
  const searchState: SearchProps = useSelector((rootReducer: any) => rootReducer.searchReducer);
  const searchLocalStorage = typeof window !== 'undefined' ?  JSON.parse(localStorage.getItem('search') || 'null') : null;
  
  const [search, setSearch] = useState<SearchProps>({ data: { term: '', result: [] } });

  const getSearch = () => {
    if (searchState){
      setSearch(searchState);      
    }    
    setSearch(searchLocalStorage);
  };
 
  useEffect(() => {
    getSearch();
  }, [searchState, searchLocalStorage]);

  const data = search?.data?.result;
  
  const router = useRouter();

  return (
    <BoxSearch>
      <Header />
      <ContainerSearch maxWidth={false}>
        {search && data && data.length > 0 ? (
          <Grid container >
            { search.data.term.length > 1 && (
              <Typography
              variant="h5"
              component="caption"
              gutterBottom
            >
              {`Resultado de álbuns de: ${search.data.term}`}
            </Typography> ) 
            }
            
            <ListSearch>
              {data?.map((term: any, index: number) => (
                <ListItemSearch
                  key={index}
                  onClick={() => router.push(`/album/${term.collectionId}`)}
                >
                  <ListItemAvatar>
                    <AvatarSearch src={term.artworkUrl100} alt={term.collectionName}/>
                  </ListItemAvatar>
                  <BoxList>
                    <Typography variant="button">{term.collectionCensoredName}</Typography>
                    <Typography variant="caption">{term.artistName}</Typography>
                  </BoxList>
                </ListItemSearch>
              ))}
            </ListSearch>
          </Grid>
        ) : (
          <TypographyList
            variant="h5"
            gutterBottom
          >
            Nenhum álbum foi encontrado
          </TypographyList>
        )}
      </ContainerSearch>
    </BoxSearch>
  );
};
export default Search;
