import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route index element={<Home/>}/>
    </Routes>
  );
}

export default App;
