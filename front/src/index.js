import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';

// STORE :
import store from './redux/store'; // Importation du store pour gérer l'état global
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/* On englobe les composants de notre application. */}
        <AuthProvider> {/* Notre contexte fournit maintenant les données aux composants enfants. */}
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
