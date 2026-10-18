import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Apply the saved theme before render; default to the white theme.
const saved = (localStorage.getItem('theme') as 'dark' | 'light' | null) || 'light';
document.documentElement.classList.remove('light', 'dark');
document.documentElement.classList.add(saved);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
