import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Provider store={store} >
  <BrowserRouter>
      <Toaster />
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
