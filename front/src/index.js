import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';
import { PanierProvider } from './context/PanierContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider> {/* Notre contexte fournit maintenant les données aux composants enfants. */}
          <PanierProvider>
            <App />
          </PanierProvider>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
