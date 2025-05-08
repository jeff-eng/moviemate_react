import {
  faStar,
  faClapperboard,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import posterPlaceholder from '../../assets/imgholdr-image.png';
import { Link } from 'react-router-dom';

export default function MovieResult({ data }) {
  const releaseYear = data.release_date.split('-')[0];

  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : posterPlaceholder;

  const posterAltDescription = data.poster_path
    ? `${data.title} movie poster`
    : 'filmstrip placeholder image';

  return (
    <Link
      to={`/movie/${data.id}`}
      aria-label={`View details for movie ${data.title} released ${data.releaseYear}`}
      className="search-result__link"
    >
      <article className="search-result">
        <img
          className="search-result__image"
          src={poster}
          alt={posterAltDescription}
        />
        <div className="search-result__details-container">
          <h2 className="search-result__title">
            {data.title}
            <time className="search-result__release-year">
              {' '}
              ({releaseYear})
            </time>
            <FontAwesomeIcon
              icon={faArrowRight}
              rotation={0}
              className="fa-arrow-icon"
            />
          </h2>

          <div>
            <span className="search-result__type">
              <FontAwesomeIcon icon={faClapperboard} className="result-type" />
              Movie
            </span>
            <span className="search-result__rating">
              <FontAwesomeIcon icon={faStar} className="fa-star-icon" />
              {data.vote_average.toFixed(1)}
            </span>
          </div>
          <p className="search-result__text">{data.overview}</p>
        </div>
      </article>
    </Link>
  );
}
