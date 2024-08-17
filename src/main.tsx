import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import BubbleEffectProvider from './components/Bubble.tsx';
import CsMessageProvider from './components/cs/message/MessageProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <CsMessageProvider>
            <BubbleEffectProvider count={15}>
               <App />
            </BubbleEffectProvider>
         </CsMessageProvider>
      </BrowserRouter>
   </StrictMode>
);
