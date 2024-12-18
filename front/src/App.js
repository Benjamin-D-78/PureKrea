import './App.css';
import { Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound';
import Boutique from './pages/Boutique/Boutique';
import Details from './pages/Details/Detail';

import Dashboard from './pages/Dashboard/Dashboard';
import Items from './pages/Dashboard/Items';
import Utilisateurs from './pages/Dashboard/Utilisateurs';
import UpdateItems from './pages/Dashboard/UpdateItems';

function App() {
  return (
    <Routes>
      <Route index element={<Boutique/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='/dashboard/items' element={<Items/>}/>
          <Route path='/dashboard/utilisateurs' element={<Utilisateurs/>}/>
          <Route path='/dashboard/update/:id' element={<UpdateItems/>}/>
      </Route>
    </Routes>
  );
}

export default App;
