import { useEffect, useState } from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../functions/function';
import '../detail/detail.css';

export default function TVLayout() {
  const { id } = useParams();
  console.log(id);

  const [TVData, setTVData] = useState(null);
  const [TVIsLoading, setTVIsLoading] = useState(false);
  const [TVError, setTVError] = useState(null);
  const [castAndCrewData, setCastAndCrewData] = useState(null);
  const [castAndCrewIsLoading, setCastAndCrewIsLoading] = useState(false);
  const [castAndCrewError, setCastAndCrewError] = useState(null);

  const TVDetailsUrl = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const TVCastAndCrewUrl = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    if (!TVDetailsUrl) return;

    const fetchTVData = async () => {
      try {
        setTVIsLoading(true);
        const response = await fetch(TVDetailsUrl, options);

        if (!response.ok) {
          throw new Error(
            `Failed HTTP Request with status: ${response.status}`,
          );
        }

        const fetchedData = await response.json();
        console.log(fetchedData);
        setTVData(fetchedData);
      } catch (err) {
        setTVError(err);
      } finally {
        setTVIsLoading(false);
      }
    };

    fetchTVData();
  }, [id]);

  // Fetch Cast and Crew info
  useEffect(() => {
    if (!TVCastAndCrewUrl) return;

    const fetchCastAndCrewData = async () => {
      try {
        const response = await fetch(TVCastAndCrewUrl, options);

        if (!response.ok) {
          throw new Error(
            `Failed HTTP Request with status: ${response.status}`,
          );
        }

        const fetchedData = await response.json();
        setCastAndCrewData(fetchedData);
      } catch (err) {
        setCastAndCrewError(err);
      } finally {
        setCastAndCrewIsLoading(false);
      }
    };

    fetchCastAndCrewData();
  }, [id]);

  const styles = TVData
    ? {
        backgroundImage: `linear-gradient(rgba(2, 8, 22, 0.8),
                      rgba(2, 8, 22, 1)),
                      url("https://image.tmdb.org/t/p/w500${TVData.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }
    : null;

  const activeStyles = {
    fontWeight: '700',
    borderBottom: '2px solid #b02a52',
  };

  if (TVData) {
    return (
      <main className="detail-main">
        <section className="movie-header" style={styles}>
          <div className="movie-header-inner">
            <img
              className="movie-header__poster"
              src={`https://image.tmdb.org/t/p/w500${TVData.poster_path}`}
            />
            <div className="header-info-container">
              <h2 className="movie-header__title">{TVData.name}</h2>
              <div className="movie-stats">
                <span>
                  <FontAwesomeIcon icon={faStar} className="fa-star-icon" />
                  {TVData.vote_average}
                </span>
              </div>
              <dl className="description-list">
                <div>
                  <dt className="description-list__term">First Air Date</dt>
                  <dd className="description-list__desc">
                    {formatDate(TVData.first_air_date)}
                  </dd>
                </div>
                <div>
                  <dt className="description-list__term">Number of Seasons</dt>
                  <dd className="description-list__desc">{`${TVData.number_of_seasons} season(s)`}</dd>
                </div>
                <div>
                  <dt className="description-list__term">Number of Episodes</dt>
                  <dd className="description-list__desc">
                    {`${TVData.number_of_episodes}`} episodes
                  </dd>
                </div>
              </dl>
              <ul className="genre-list">
                {TVData.genres.map((genre, index) => {
                  return (
                    <li className="genre-list__item" key={index}>
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        <section className="movie-info">
          <nav className="details__nav">
            <NavLink
              to={`/tv/${id}`}
              end
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="navlink-tab"
            >
              Details
            </NavLink>
            <NavLink
              to={`/tv/${id}/castandcrew`}
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="navlink-tab"
            >
              Cast & Crew
            </NavLink>
          </nav>
          <Outlet
            context={{
              TVData,
              TVIsLoading,
              TVError,
              castAndCrewData,
              castAndCrewIsLoading,
              castAndCrewError,
            }}
          />
        </section>
      </main>
    );
  }
}
