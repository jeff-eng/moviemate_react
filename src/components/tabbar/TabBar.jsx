import { Link } from 'react-router-dom';
import './tabbar.css';

export default function TabBar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav__link" tabIndex={0}>
        <i className="fa-solid fa-house nav__icon"></i>
        <p className="nav__label">Home</p>
      </Link>
      <Link to="/watchlist" className="nav__link" tabIndex={0}>
        <i className="fa-solid fa-heart nav__icon"></i>
        <p className="nav__label">Watchlist</p>
      </Link>
      <Link to="/account" className="nav__link" tabIndex={0}>
        <i className="fa-solid fa-user-gear nav__icon"></i>
        <p className="nav__label">Account</p>
      </Link>
    </nav>
  );
}
