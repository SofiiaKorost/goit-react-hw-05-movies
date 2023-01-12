import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={style.movieList}>
      {movies &&
        movies.map(({ id, poster_path, title }) => (
          <Link
            to={`/movies/${id}`}
            key={id}
            state={{ from: location }}
            className={style.movieLink}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              className={style.movieImg}
            />
            <h3 className={style.movieTitle}>{title}</h3>
          </Link>
        ))}
    </ul>
  );
};
export default MoviesList;