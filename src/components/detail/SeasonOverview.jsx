import { getReleaseYear } from '../../functions/function';

export default function SeasonOverview({ seasonData }) {
  if (seasonData) {
    return (
      <article className="series__season">
        <h4 className="series__season-title season-header">
          {seasonData.name}
          <span className="series__season-year">
            ({seasonData.air_date ? getReleaseYear(seasonData.air_date) : 'n/a'}
            )
          </span>
        </h4>
        <img
          className="series__season-poster season-poster"
          src={`https://image.tmdb.org/t/p/w500${seasonData.poster_path}`}
        />
        <p className="series__season-episode-count season-episode-count">
          {seasonData.episode_count} episode(s)
        </p>
        <p className="series__season-description season-description">
          {seasonData.overview
            ? seasonData.overview
            : 'No season overview available'}
        </p>
      </article>
    );
  }
}
