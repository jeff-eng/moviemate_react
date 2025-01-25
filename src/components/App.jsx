import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Watchlist from '../pages/watchlist/Watchlist';
import Account from '../pages/account/Account';
import MainLayout from './mainlayout/MainLayout';
import './App.css';

const AppContext = createContext();

export default function App() {
  const [results, setResults] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppContext.Provider
      value={{ results, setResults, searchQuery, setSearchQuery }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export { AppContext };
