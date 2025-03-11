import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Watchlist from '../pages/watchlist/Watchlist';
import Account from '../pages/account/Account';
import MainLayout from './layouts/MainLayout';
import './App.css';
import './styles/searchresult.css';
import MovieLayout from './layouts/MovieLayout';
import MovieDetail from '../components/detail/MovieDetail';
import TVLayout from '../components/layouts/TVLayout';
import TVDetail from '../components/detail/TVDetail';
import CastAndCrew from './castandcrew/CastAndCrew';

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
            <Route path="movies/:id" element={<MovieLayout />}>
              <Route index element={<MovieDetail />} />
              <Route path="castandcrew" element={<CastAndCrew />} />
            </Route>
            <Route path="tv/:id" element={<TVLayout />}>
              <Route index element={<TVDetail />} />
              <Route path="castandcrew" element={<CastAndCrew />} />
            </Route>
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export { AppContext };
