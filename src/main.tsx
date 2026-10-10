import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Apply saved theme (default dark) before render to avoid flash
const saved = (localStorage.getItem('theme') as 'dark' | 'light' | null) || 'dark';
document.documentElement.classList.remove('light', 'dark');
document.documentElement.classList.add(saved);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
