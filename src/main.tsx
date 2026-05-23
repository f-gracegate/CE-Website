import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent benign Vite development HMR/WebSocket client failure overlays or unhandled rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (
      reason &&
      (reason.message?.includes('WebSocket') ||
       reason.message?.includes('vite') ||
       String(reason).includes('WebSocket') ||
       String(reason).includes('websocket') ||
       String(reason).includes('Websocket'))
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    if (
      event.message?.includes('WebSocket') ||
      event.message?.includes('websocket') ||
      event.error?.message?.includes('WebSocket')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

