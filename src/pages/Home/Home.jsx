import { useEffect } from 'react';
import { useState } from 'react';
import { fetchTrending } from '../../API/apiMovies';
import MoviesList from 'components/MoviesList/MoviesList';
import style from './Home.module.css';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const movies = await fetchTrending();
        console.log(movies);
        setMovies(movies);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCountries();
  }, []);
  return (
    <div>
      <h2 className={style.title}>Trending Movies</h2>
      <MoviesList movies={movies} location={location} />
    </div>
  );
};
export default Home;