import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import MovieResult from '../../components/movie/MovieResult';
import TVResult from '../../components/tv/TVResult';
import PersonResult from '../../components/person/PersonResult';
import { AppContext } from '../../components/App';
import './home.css';

export default function Home() {
  const { results, setResults, searchQuery, setSearchQuery } =
    useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(1);

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const query = formData.get('query').trim();

    // Short-circuit if query is empty
    if (!query) {
      return;
    }

    const queryString = new URLSearchParams(formData).toString();
    const updatedQueryString = queryString.replace(/\+/g, '%20');
    const urlString = `https://api.themoviedb.org/3/search/multi?${updatedQueryString}&include_adult=false&language=en-US&page=${pageNumber}`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(urlString, options);
      const data = await response.json();
      // Sorts results into an object (keys = tv, movie, person; values = array of results for each category)
      const sortedResults = Object.groupBy(
        data.results,
        ({ media_type }) => media_type,
      );
      setResults(sortedResults);
    } catch (err) {
      console.error(err);
    }
  }

  function renderResults(searchResults) {
    return Object.values(searchResults)
      .flat()
      .map((result, index) => {
        if (result.media_type === 'movie') {
          return <MovieResult key={result.id} data={result} />;
        } else if (result.media_type === 'tv') {
          return <TVResult key={result.id} data={result} />;
        } else if (result.media_type === 'person') {
          return <PersonResult key={result.id} data={result} />;
        }
      });
  }

  return (
    <>
      <search>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="query"
            placeholder="e.g. Game of Thrones"
            onChange={handleChange}
            value={searchQuery}
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </search>
      <main className="results">{results && renderResults(results)}</main>
    </>
  );
}
