import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import {
  faHouse,
  faHeart,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import './tabbar.css';

export default function TabBar() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      setIsScrolling(true);

      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={isScrolling ? 'nav hide-nav' : 'nav'}>
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
