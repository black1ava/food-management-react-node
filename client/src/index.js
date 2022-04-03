import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from '@shopify/polaris';
import enTranslation from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import reducer from './reducer';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const store = createStore(reducer);

root.render(
  <Provider store={ store }>
    <AppProvider i18n={ enTranslation }>
      <App />
    </AppProvider>
  </Provider>
);