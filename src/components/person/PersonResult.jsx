import actorPlaceholder from '../../assets/icons8-actor-100.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons/faMasksTheater';

export default function PersonResult({ data }) {
  const { known_for, name, profile_path, known_for_department } = data;
  const creditsList = known_for
    .slice(0, 2)
    .map(show => show.title || show.name)
    .join(', ');
  const profilePhoto = data.profile_path
    ? `https://image.tmdb.org/t/p/w500${profile_path}`
    : actorPlaceholder;

  return (
    <article className="search-result">
      <img
        className="search-result__image"
        src={profilePhoto}
        alt={`profile photo of ${name}`}
      />
      <div className="search-result__details-container">
        <h2 className="search-result__name">{name}</h2>
        <span className="search-result__type">
          <FontAwesomeIcon icon={faMasksTheater} className="result-type" />
          {known_for_department}
        </span>
        <p className="search-result__credits">{creditsList}</p>
      </div>
    </article>
  );
}
