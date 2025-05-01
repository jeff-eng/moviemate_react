import { useEffect, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../../functions/function';
import { faStar, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getReleaseYear } from '../../functions/function';
import './personlayout.css';

export default function PersonLayout() {
  const { id } = useParams();
  const [personData, setPersonData] = useState(null);
  const [personCreditsData, setPersonCreditsData] = useState(null);
  const personDetailsUrl = id && `https://api.themoviedb.org/3/person/${id}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    if (!personDetailsUrl) {
      return;
    }

    console.log('useEffect called');
    const fetchData = async () => {
      try {
        const personDetailsResponse = await fetch(personDetailsUrl, options);
        if (!personDetailsResponse.ok) {
          throw new Error(
            `Failed HTTPS request with status: ${personDetailsResponse.status}`,
          );
        }

        const fetchedPersonDetailsData = await personDetailsResponse.json();
        setPersonData(fetchedPersonDetailsData);

        const personCreditsResponse = await fetch(
          `${personDetailsUrl} + /combined_credits`,
          options,
        );
        if (!personCreditsResponse.ok) {
          throw new Error(
            'Failed HTTPS request with status: ${personDetailsResponse.status}',
          );
        }

        const fetchedPersonCreditsData = await personCreditsResponse.json();

        fetchedPersonCreditsData.cast = fetchedPersonCreditsData.cast.sort(
          (a, b) => {
            const firstItem =
              a.release_date || a.first_air_date || '1900-01-01';
            const secondItem =
              b.release_date || b.first_air_date || '1900-01-01';

            return (
              parseInt(getReleaseYear(secondItem)) -
              parseInt(getReleaseYear(firstItem))
            );
          },
        );

        fetchedPersonCreditsData.crew = fetchedPersonCreditsData.crew.sort(
          (a, b) => {
            const firstItem =
              a.release_date || a.first_air_date || '1900-01-01';
            const secondItem =
              b.release_date || b.first_air_date || '1900-01-01';

            return (
              parseInt(getReleaseYear(secondItem)) -
              parseInt(getReleaseYear(firstItem))
            );
          },
        );

        setPersonCreditsData(fetchedPersonCreditsData);
        console.log(fetchedPersonCreditsData);
      } catch (err) {
        // Set error state
      } finally {
        // Set loading state
      }
    };

    fetchData();
  }, [id]);

  const crewCreditsObj =
    personCreditsData &&
    personCreditsData.crew.reduce((acc, current) => {
      if (!acc[current.department]) {
        acc[current.department] = [];
      }

      acc[current.department].push(current);
      return acc;
    }, {});

  // Components
  function CrewCredit({ data }) {
    return (
      <article className="credit">
        <Link to={`/${data.media_type}/${data.id}`}>
          <div className="credit-container-left">
            <img
              className="credit__image"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={`${data.media_type} poster of ${data.title}`}
            />
            <h5 className="credit__title">
              {data.title ? data.title : data.name}
            </h5>
            <span className="credit__rating">
              <FontAwesomeIcon icon={faStar} className="fa-star-icon" />
              {data.vote_average ? data.vote_average : 'n/a'}
            </span>
            <p className="credit__type">
              {data.media_type === 'movie' ? 'Movie' : 'TV Series'}
            </p>
          </div>
          <div className="credit-container-right">
            {data.release_date && (
              <time date={getReleaseYear(data.release_date)}>
                {getReleaseYear(data.release_date)}
              </time>
            )}
            <p>{data.job}</p>
          </div>
        </Link>
      </article>
    );
  }

  function ActingCredit({ data }) {
    return (
      <article className="credit">
        <Link to={`/${data.media_type}/${data.id}`}>
          <div className="credit-container-left">
            <img
              className="credit__image"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={`${data.media_type} poster of ${data.title}`}
            />
            <h5 className="credit__title">
              {data.title ? data.title : data.name}
            </h5>
            <span className="credit__rating">
              <FontAwesomeIcon icon={faStar} className="fa-star-icon" />
              {data.vote_average ? data.vote_average.toFixed(1) : 'n/a'}
            </span>
            <p className="credit__type">
              {data.media_type === 'movie' ? 'Movie' : 'TV Series'}
            </p>
            <p className="credit__character">{data.character}</p>
          </div>
          <div className="credit-container-right">
            {data.first_air_date && (
              <time date={getReleaseYear(data.first_air_date)}>
                {getReleaseYear(data.first_air_date)}
              </time>
            )}
            {data.release_date && (
              <time date={getReleaseYear(data.release_date)}>
                {getReleaseYear(data.release_date)}
              </time>
            )}

            {data.episode_count && <p>{data.episode_count} episode(s)</p>}
          </div>
        </Link>
      </article>
    );
  }

  function renderCrewCredits(obj) {
    console.log(obj);

    return Object.entries(obj).map(([department, array]) => {
      return (
        <Fragment key={department}>
          <h4>{department}</h4>
          <h5>{obj.id}</h5>
          {array.map((obj, index) => {
            return <CrewCredit key={`crew-${obj.id}-${index}`} data={obj} />;
          })}
        </Fragment>
      );
    });
  }

  if (personData) {
    return (
      <main className="person-main">
        <section className="person-header">
          <header className="person-header__upper">
            <img
              className="person-header__image"
              src={`https://image.tmdb.org/t/p/w500${personData.profile_path}`}
              alt={`profile image of ${personData.name}`}
            />
            <h2 className="person-header__heading">{personData.name}</h2>
            <dl className="person-header__description-list">
              <dt className="description-list__term">Known For</dt>
              <dd className="description-list__desc">
                {personData.known_for_department}
              </dd>
              <dt className="description-list__term ">Birthday</dt>
              <dd className="description-list__desc">
                {formatDate(personData.birthday)}
              </dd>
              {personData.deathday && (
                <>
                  <dt className="description-list__term">Date of Death</dt>
                  <dd className="descdescription-list__desc">
                    {formatDate(personData.deathday)}
                  </dd>
                </>
              )}
              <dt className="description-list__term ">Place of Birth</dt>
              <dd className="description-list__desc">
                {personData.place_of_birth}
              </dd>
              <dt className="description-list__term ">Also Known As</dt>
              <dd className="description-list__desc">
                {personData.also_known_as.map((name, index) => {
                  return <p key={`${name}-${index}`}>{name}</p>;
                })}
              </dd>
            </dl>
          </header>
          <p className="person-bio">{personData.biography}</p>
        </section>
        <section className="credits-container">
          <h3>Credits</h3>
          <div role="group">
            <h4>Acting</h4>
            {personCreditsData &&
              personCreditsData.cast.map((credit, index) => (
                <ActingCredit
                  key={`acting-${credit.id}-${index}`}
                  data={credit}
                />
              ))}
          </div>
          <div role="group">
            {crewCreditsObj && renderCrewCredits(crewCreditsObj)}
          </div>
        </section>
      </main>
    );
  }
}
