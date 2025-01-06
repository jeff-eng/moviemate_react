import './App.css';
import Home from '../pages/home/Home';
import Watchlist from '../pages/watchlist/Watchlist';
import Account from '../pages/account/Account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './mainlayout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
