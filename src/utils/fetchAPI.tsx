
export const allFetchAPI = async (term: string) => {
  try {
    const apiUrl = `https://itunes.apple.com/search?entity=album&term=${term}&attribute=allArtistTerm`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    };

    const data = await response.json();    
    return data.results;
  } catch (error) {
    console.error('Erro na requisição:', error);
  };
};

export const getMusics = async (id: string) => {
  try {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    };
    const data = await response.json();
    return data;
  } catch (error){
    console.error('Erro na requisição de music videos', error);
  };
};
