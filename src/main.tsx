import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Preload Twitter widgets for faster loading
const loadTwitterWidgets = () => {
  if (typeof window !== 'undefined' && !window.twttr) {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = () => {
      // Initialize widgets immediately when script loads
      if (window.twttr?.widgets) {
        window.twttr.widgets.load();
      }
    };
    document.head.appendChild(script);
  }
};

// Load Twitter widgets as soon as possible
loadTwitterWidgets();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <App />
  </StrictMode>,
)
