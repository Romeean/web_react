import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tw.css'
import './styles/main.scss'
import App from './App.jsx'
import { store } from './app/store.js'

import { Provider } from 'react-redux'
import {ThemeProvider} from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider initial="light">
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
