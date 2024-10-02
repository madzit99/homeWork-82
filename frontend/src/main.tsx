import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store.ts';
import theme from './theme.ts';
import { ThemeProvider } from '@mui/material';
import { addInterceptors } from './axiosApi.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGOLE_CLIENT_ID } from './constants.ts';


addInterceptors(store);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGOLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
