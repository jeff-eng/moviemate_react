import { useEffect, useState } from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../detail/detail.css';

export default function MovieLayout() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [movieIsLoading, setMovieIsLoading] = useState(false);
  const [movieError, setMovieError] = useState(null);
  const [castAndCrewData, setCastAndCrewData] = useState(null);
  const [castAndCrewIsLoading, setCastAndCrewIsLoading] = useState(false);
  const [castAndCrewError, setCastAndCrewError] = useState(null);

  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const movieCastAndCrewUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  // Fetch Movie info details
  useEffect(() => {
    if (!movieDetailsUrl) return;

    const fetchMovieData = async () => {
      try {
        setMovieIsLoading(true);
        const response = await fetch(movieDetailsUrl, options);

        if (!response.ok) {
          throw new Error(
            `Failed HTTP Request with status: ${response.status}`,
          );
        }

        const fetchedData = await response.json();
        setMovieData(fetchedData);
      } catch (err) {
        setMovieError(err);
      } finally {
        setMovieIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  // Fetch Cast and Crew info
  useEffect(() => {
    if (!movieCastAndCrewUrl) return;

    const fetchCastAndCrewData = async () => {
      try {
        const response = await fetch(movieCastAndCrewUrl, options);

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function getReleaseYear(dateString) {
    return dateString.split('-')[0];
  }

  function createRuntimeString(minutes) {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;

    return `${hours}h ${min}m`;
  }

  const styles = movieData
    ? {
        backgroundImage: `linear-gradient(rgba(2, 8, 22, 0.8),
                        rgba(2, 8, 22, 1)),
                        url("https://image.tmdb.org/t/p/w500${movieData.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }
    : null;

  const activeStyles = {
    fontWeight: '700',
    borderBottom: '2px solid #b02a52',
  };

  if (movieIsLoading) return <p>Loading movie details...</p>;
  if (movieError) return <p>Error: {movieError.message}</p>;

  if (movieData) {
    return (
      <main className="detail-main">
        <section className="movie-header" style={styles}>
          <div className="movie-header-inner">
            <img
              className="movie-header__poster"
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            />
            <div className="header-info-container">
              <h2 className="movie-header__title">
                {movieData ? movieData.title : ''}{' '}
                {`(${getReleaseYear(movieData.release_date)})`}
              </h2>
              <div className="movie-stats">
                <span>
                  <FontAwesomeIcon icon={faStar} className="fa-star-icon" />
                  {movieData.vote_average}
                </span>
                <span>
                  <FontAwesomeIcon icon={faClock} className="fa-clock-icon" />
                  {createRuntimeString(movieData.runtime)}
                </span>
              </div>
              <dl>
                <dt className="release-date__heading">Release Date</dt>
                <dd className="release-date__date">
                  {formatDate(movieData.release_date)}
                </dd>
              </dl>
              <ul className="genre-list">
                {movieData.genres.map((genre, index) => {
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
              to={`/movies/${id}`}
              end
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="navlink-tab"
            >
              Details
            </NavLink>
            <NavLink
              to={`/movies/${id}/castandcrew`}
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="navlink-tab"
            >
              Cast & Crew
            </NavLink>
          </nav>
          <Outlet
            context={{
              movieData,
              movieIsLoading,
              movieError,
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
