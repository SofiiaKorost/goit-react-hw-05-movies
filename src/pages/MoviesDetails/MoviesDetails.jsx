import { useEffect, useState } from 'react';
import { Outlet, useParams, useLocation, NavLink } from 'react-router-dom';
import { fetchMovieDetails } from '..//../apiMovies';
import style from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetchMovieDetails(Number(movieId));
        console.log(response);
        setDetails(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    <>
      {details && (
        <div className={style.detailsBox}>
          <div className={style.imgBox}>
            <NavLink
              to={location?.state?.from ?? '/'}
              className={style.detailsBtn}
            >
              {' '}
              ⇦ Go back
            </NavLink>
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={details.title}
              className={style.detailsImg}
            />
          </div>
          <div className={style.detailsInfo}>
            <h2 className={style.detailsTitle}>
              {details.title} ({details.release_date})
            </h2>
            <p className={style.detailsText}>
              User score: {details.vote_average}
            </p>
            <h2 className={style.detailsTitle}>Overview</h2>
            <p className={style.detailsText}>{details.overview}</p>
            <h2 className={style.detailsTitle}>Genres</h2>
            <p className={style.detailsText}>
              {' '}
              {details.genres.map(genre => genre.name).join(', ')}
            </p>
          </div>
        </div>
      )}
      <div className={style.boxLink}>
        <h2 className={style.detailsTitle}>Additional information</h2>
        <ul>
          <NavLink
            to="cast"
            state={{ from: location?.state?.from ?? '/' }}
            className={style.infoLink}
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            state={{ from: location?.state?.from ?? '/' }}
            className={style.infoLink}
          >
            Reviews
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </>
  );
};
export default MovieDetails;