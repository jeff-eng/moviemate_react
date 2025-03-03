import { useOutletContext } from 'react-router-dom';
import './detail.css';

export default function MovieDetail() {
  const { movieData, movieIsLoading, movieError } = useOutletContext();

  function convertToCurrency(number) {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  if (movieData) {
    return (
      <>
        <h3 className="movie-overview__heading">Overview</h3>
        <p className="movie-overview__text">{movieData.overview}</p>
        <dl className="movie-details">
          <dt className="movie-details__term">Budget</dt>
          <dd className="movie-details__detail">
            {convertToCurrency(movieData.budget)}
          </dd>
          <dt className="movie-details__term">Box Office</dt>
          <dd className="movie-details__detail">
            {convertToCurrency(movieData.revenue)}
          </dd>
          <dt className="movie-details__term">Production Companies</dt>
          <dd className="movie-details__detail">
            {movieData.production_companies
              .map(company => {
                return company.name;
              })
              .join(', ')}
          </dd>
          <dt className="movie-details__term">Status</dt>
          <dd className="movie-details__detail">{movieData.status}</dd>
        </dl>
      </>
    );
  }
}
