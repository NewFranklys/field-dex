import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

/*
  BrowserRouter permite que nossa
  aplicação trabalhe com URLs.
*/
import { BrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App.jsx'


createRoot(
  document.getElementById('root')
).render(

  <StrictMode>

    {/*
      Tudo que estiver dentro
      de BrowserRouter pode usar:

      Routes
      Route
      navigate
      useParams
      etc.
    */}
    <BrowserRouter>

      <App />

    </BrowserRouter>

  </StrictMode>
)