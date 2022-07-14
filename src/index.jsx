import React from 'react';
import App from './containers/App/App.jsx';
import store from './store/store.js';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './store/authContext';
import './index.css';
import '@fontsource/mulish';
import * as ReactDOM from 'react-dom/client';
import DiningRoomTheme from './themes/DiningRoomTheme.js';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <AuthContextProvider>
      <Provider store={ store } >
        <ChakraProvider theme={ DiningRoomTheme }>
            <App />
        </ChakraProvider>
      </Provider>
  </AuthContextProvider>
);


