import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SSR from "./views/SSR/index.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <SSR/>
  </StrictMode>,
)
