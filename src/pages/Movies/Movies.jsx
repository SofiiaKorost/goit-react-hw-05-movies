import { BiSearchAlt } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
//import { fetchMoviesWithQuery } from '../../apiMovies';
import { useSearchParams, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import style from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({});
  const location = useLocation();

  const handleSubmit = e => {
    e.preventDefault();

    setSearchQuery(
      e.currentTarget.elements.searchQuery.value.toLowerCase().trim()
    );
    setSearchParams({
      query: e.currentTarget.elements.searchQuery.value.toLowerCase().trim(),
    });
  };

  console.log(searchParams);
  const currentQuery = searchParams.get('query');
  console.log(currentQuery);

  useEffect(() => {
    if (!currentQuery) {
      console.log('nety');
    }
  }, [currentQuery]);

  useEffect(() => {
    if (searchQuery !== '') {
      const getMovieBySearch = async () => {
        try {
          const response = await fetchMoviesWithQuery(searchQuery);
          console.log(response);
          setMovies(response);
        } catch (error) {
          setError(error.message);
          console.log(error.message);
        }
      };
      getMovieBySearch();
    } else if (currentQuery) {
      const getMovieBySearch = async () => {
        try {
          const response = await fetchMoviesWithQuery(currentQuery);
          console.log(response);
          setMovies(response);
        } catch (error) {
          setError(error.message);
          console.log(error.message);
        }
      };
      getMovieBySearch();
    }

    return;
  }, [searchQuery, currentQuery]);

  return (
    <>
      <form className={style.box} onSubmit={handleSubmit}>
        <input
          className={style.input}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search..."
        />
        <button type="submit" className={style.btn}>
          <IconContext.Provider
            value={{
              color: 'black',
              size: '35',
              className: 'global-class-name',
            }}
          >
            <div>
              <BiSearchAlt />
            </div>
          </IconContext.Provider>
        </button>
      </form>
      {!error ? (
        <MoviesList movies={movies} location={location} />
      ) : (
        <p className={style.moviesText}>No results found for `{searchQuery}`</p>
      )}
    </>
  );
};
export default Movies;