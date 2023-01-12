import { useState, useEffect } from 'react';
import { fetchReviews } from '../../apiMovies';
import { useParams } from 'react-router';
import style from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetchReviews(Number(movieId));
        console.log(response);
        setReviews(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div className={style.reviewsBox}>
      {reviews.length !== 0 ? (
        <ul className={style.reviewsList}>
          {reviews &&
            reviews.map(({ content, author_details, id }) => {
              return (
                <li key={id} data-id={id} className={style.reviewsItem}>
                  <p className={style.reviewsText}>
                    Author:{' '}
                    {author_details.name ? author_details.name : 'Anonymous'}
                  </p>
                  <p className={style.reviewsText}>
                    Rating: {author_details.rating}
                  </p>

                  <p className={style.reviewsText}>{content}</p>
                </li>
              );
            })}
        </ul>
      ) : (
        <p className={style.reviewsText}>
          We don't have any reviews for this movie
        </p>
      )}
    </div>
  );
};
export default Reviews;