import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  function handleSearchInputChange(event) {
    const searchInputValue = event.target.value;

    // Sanitize input - trim leading and trailing whitespace

    setSearchQuery(searchInputValue);
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

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?${updatedQueryString}&include_adult=false&language=en-US&page=${pageNumber}`,
        options,
      );

      const data = await response.json();
      console.log(data.results);
      setResults(data.results);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <search>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="query"
            placeholder="e.g. Game of Thrones"
            onChange={handleSearchInputChange}
            value={searchQuery}
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </search>
      <main>
        {results.map((result, index) => (
          <>
            <h3 key={index}>{result.title}</h3>
          </>
        ))}
      </main>
    </>
  );
}
