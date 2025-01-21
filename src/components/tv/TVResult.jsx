import './TVResult.css';

export default function TVResult({ data }) {
  const releaseYear = data.release_date.split('-')[0];
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : posterPlaceholder;
  const posterAltDescription = data.poster_path
    ? `${data.title} TV series poster`
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
          {data.name}
          <time className="search-result__release-year"> ({releaseYear})</time>
        </h2>
        <span className="search-result__type">TV Series</span>
        <span className="search-result__rating">
          <FontAwesomeIcon icon={faStar} />
          {data.vote_average}
        </span>
        <p className="search-result__text">{data.overview}</p>
      </div>
    </article>
  );
}
