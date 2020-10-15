import React from 'react';
import './Movie.css';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const Movie = ({ title, poster_path: poster, overview,  release_date: date }) => {
return (
<li className="movie-card">
  <div className="movie-card__poster-container">
    <img src={IMG_API + poster} alt="poster" className="movie-card__poster" />
  </div>

  <div className="movie-card__info-container">
    <div className="movie-card__header">
      <h1 className="movie-card__title">{title}</h1>
    </div>
    <div className="movie-card__release-date">{format(new Date(date), 'PP')}</div>
    <div className="movie-card__genre-list">Action</div>
    <div className="movie-card__description">{overview}</div>
  </div>
</li>
  );
}

Movie.propTypes = {
  title: PropTypes.string,
  poster_path: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
};

Movie.defaultProps = {
  title: '',
  poster_path: '',
  overview: '',
  release_date: '',
};

export default Movie;
