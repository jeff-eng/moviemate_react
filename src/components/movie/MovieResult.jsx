import { faStar, faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import posterPlaceholder from '../../assets/imgholdr-image.png';

export default function MovieResult({ data }) {
  const releaseYear = data.release_date.split('-')[0];

  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : posterPlaceholder;

  const posterAltDescription = data.poster_path
    ? `${data.title} movie poster`
    : 'filmstrip placeholder image';

  return (
    <article className="search-result">
      <img
        className="search-result__image"
        src={poster}
        alt={posterAltDescription}
      />
      <div className="search-result__details-container">
        <h2 className="search-result__title">
          {data.title}
          <time className="search-result__release-year"> ({releaseYear})</time>
        </h2>
        <div>
          <span className="search-result__type">
            <FontAwesomeIcon icon={faClapperboard} className="result-type" />
            Movie
          </span>
          <span className="search-result__rating">
            <FontAwesomeIcon icon={faStar} className="star-icon" />
            {data.vote_average.toFixed(1)}
          </span>
        </div>
        <p className="search-result__text">{data.overview}</p>
      </div>
    </article>
  );
}
