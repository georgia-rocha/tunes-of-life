import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import {  store } from '../redux/store'; 
 
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
  <>
    <style>
    {`
    * {
      font-family: sans-serif;
    }
    `}
    </style>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
  );
};
export default App;
