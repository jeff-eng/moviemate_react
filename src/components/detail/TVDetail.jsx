import { useOutletContext } from 'react-router-dom';
import SeasonOverview from './SeasonOverview';
import './detail.css';

export default function TVDetail() {
  const { TVData, TVIsLoading, TVError } = useOutletContext();

  if (TVData) {
    return (
      <>
        <h3 className="movie-overview__heading">Overview</h3>
        <p className="movie-overview__text">{TVData.overview}</p>
        <h3 className="seasons-heading">Seasons</h3>
        <div className="series">
          {TVData.seasons.map(season => {
            console.log(season.id);
            return (
              <SeasonOverview key={`season-${season.id}`} seasonData={season} />
            );
          })}
        </div>
      </>
    );
  }
}
