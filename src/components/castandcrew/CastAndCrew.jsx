import { useOutletContext } from 'react-router-dom';
import actorPlaceholder from '../../assets/icons8-actor-100.png';

export default function CastAndCrew() {
  const { castAndCrewData, castAndCrewIsLoading, castAndCrewError } =
    useOutletContext();

  const crewObj = castAndCrewData.crew.reduce((acc, current) => {
    // Create the key if doesn't exist
    if (!acc[current.department]) {
      acc[current.department] = [];
    }

    acc[current.department].push(current);

    return acc;
  }, {});

  function renderCrew(obj) {
    return Object.entries(obj).map(([key, value]) => {
      return (
        <details key={key} className="crew-section">
          <summary className="crew-section__dept">{key}</summary>
          <div className="crewmembers-container">
            {value.map((val, index) => {
              return (
                <div
                  key={`crew-${val.id}-${index}`}
                  className="crewmember-wrapper"
                >
                  <p className="crew-section__name">{val.name}</p>
                  <p className="crew-section__job">{val.job}</p>
                </div>
              );
            })}
          </div>
        </details>
      );
    });
  }

  if (castAndCrewData) {
    return (
      <>
        <section className="cast-section">
          <h2>Cast</h2>
          <div className="cast">
            {castAndCrewData.cast.map(member => {
              return (
                <article className="cast-card" key={member.id}>
                  <img
                    loading="lazy"
                    className="cast-card__image"
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${member.profile_path}`
                        : actorPlaceholder
                    }
                  />
                  <p className="cast__name-text">{member.name}</p>
                  <p className="cast__character-text">{member.character}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section>
          <h2>Crew</h2>
          <div className="crew">{renderCrew(crewObj)}</div>
        </section>
      </>
    );
  }
}
