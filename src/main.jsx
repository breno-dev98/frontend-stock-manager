import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import App from './App.jsx'
import './index.css'
import "primereact/resources/themes/lara-light-blue/theme.css"; // ou outro tema
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
