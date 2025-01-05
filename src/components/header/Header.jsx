import { Link } from 'react-router-dom';
import './header.css';
import movieMateLogo from '../../assets/moviemate-logo.svg';

export default function Header() {
  return (
    <header className="header">
      <Link className="logo-link" to="/">
        <img
          className="logo__image"
          src={movieMateLogo}
          alt="five vertical pill shapes alternating between taller and shorter sizes"
        />
        <h1 className="logo__heading">MovieMate</h1>
      </Link>
      <Link className="header-link" to="/about">
        About
      </Link>
    </header>
  );
}
