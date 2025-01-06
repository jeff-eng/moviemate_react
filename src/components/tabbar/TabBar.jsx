import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faHeart,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import './tabbar.css';

export default function TabBar() {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'nav__link nav__link--active' : 'nav__link'
        }
        tabIndex={0}
      >
        <FontAwesomeIcon className="nav__icon" icon={faHouse} />
        <p className="nav__label">Home</p>
      </NavLink>
      <NavLink
        to="/watchlist"
        className={({ isActive }) =>
          isActive ? 'nav__link nav__link--active' : 'nav__link'
        }
        tabIndex={0}
      >
        <FontAwesomeIcon className="nav__icon" icon={faHeart} />
        <p className="nav__label">Watchlist</p>
      </NavLink>
      <NavLink
        to="/account"
        className={({ isActive }) =>
          isActive ? 'nav__link nav__link--active' : 'nav__link'
        }
        tabIndex={0}
      >
        <FontAwesomeIcon className="nav__icon" icon={faUserGear} />
        <p className="nav__label">Account</p>
      </NavLink>
    </nav>
  );
}
