import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'


/*
  Procuramos a div:

  <div id="root"></div>

  que existe no index.html.

  E colocamos nossa aplicação
  React inteira dentro dela.
*/
createRoot(
  document.getElementById('root')
).render(

  <StrictMode>

    <App />

  </StrictMode>
)