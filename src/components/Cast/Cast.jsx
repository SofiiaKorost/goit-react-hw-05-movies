import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchCast } from '../../API/apiMovies';
import style from './Cast.module.css';

const Cast = () => {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      try {
        const response = await fetchCast(Number(movieId));
        console.log(response);
        setCredits(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div className={style.castBox}>
      {credits.length !== 0 && (
        <ul className={style.castList}>
          {credits &&
            credits.map(({ name, profile_path, character, id }) => {
              return (
                <li key={id} className={style.castItem}>
                  <img
                    className={style.castImg}
                    src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                    alt={name}
                  />
                  <p className={style.castText}>{name}</p>
                  <p className={style.castText}>Character: {character} </p>
                </li>
              );
            })}
        </ul>
      )}{' '}
      {credits.length === 0 && (
        <p className={style.castText}>
          We have no information about the actors of this movie
        </p>
      )}
    </div>
  );
};
export default Cast;