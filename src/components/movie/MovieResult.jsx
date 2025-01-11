export default function MovieResult({ data }) {
  const releaseYear = data.release_date.split('-')[0];

  return (
    <article>
      <h3>
        {data.title}
        <time> ({releaseYear})</time>
      </h3>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={`${data.title} poster`}
      />
    </article>
  );
}
