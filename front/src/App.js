import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound';
import Boutique from './pages/Boutique/Boutique';
import Commande from './pages/Commande/commande';
import Details from './pages/Details/Detail';
import Inscription from './pages/Utilisateurs/Inscription';
import Connexion from './pages/Utilisateurs/Connexion';

import Layout from './components/Layout';
import RoutesPubliques from './components/RoutesPubliques';
import RoutesProtegees from './components/RoutesProtegees';

import Dashboard from './pages/Dashboard/Dashboard';
import Items from './pages/Dashboard/Items';
import UpdateItems from './pages/Dashboard/UpdateItems';
import Utilisateurs from './pages/Dashboard/Utilisateurs';
import AjoutUtilisateur from './pages/Dashboard/Users';
import UpdateUsers from './pages/Dashboard/UpdateUsers';

function App() {
  return (
    <Routes>
      {/* Routes constamment disponibles */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Boutique />} />  {/* Page principale */}
        <Route path="/details/:id" element={<Details />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="*" element={<NotFound />} />  {/* Page NotFound */}
      </Route>

      {/* Routes publiques */}
      <Route element={<RoutesPubliques />}>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
      </Route>

      {/* Routes protégées */}
      <Route element={<RoutesProtegees />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="items" element={<Items />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
          <Route path="update/item/:id" element={<UpdateItems />} />
          <Route path="ajout" element={<AjoutUtilisateur />} />
          <Route path="update/utilisateur/:id" element={<UpdateUsers />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
